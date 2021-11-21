import {UID_CREATOR_BASE} from "../utils/UidCreatorBase";
import {viewClone} from "../utils/CloneUtil";

const VIEW_UID_CREATOR = UID_CREATOR_BASE.getUidCreatorInstance();

export interface ExtendableState<State> {
    initBaseState(): State;
}

export interface ExtendableVariables<Variables> {
    initBaseVariables(): Variables;
}

/**
 * View has following construction process.
 * constructor --> render --> setState --> cache(optional)
 * props: data that are --STATIC--  and   --PROTECTED--   in SaR process.
 * state:  data that are --DYNAMIC-- and   --PROTECTED--   in SaR process.
 * Variables: data that are --DYNAMIC-- and --NOT PROTECTED-- in SaR process.
 * RootElement: root DOM element object. like: HTMLDivElement
 * Cache: data that are stored for SaR. this data mostly contains data inside variables or DOM elements. like input value.
 * SaveOptions: options that pass to SaR process.
 */
export abstract class BaseView<Props = any, State = any, Variables = any, RootElement extends Element = Element> {
    private readonly _uid: string;
    private _subviews: BaseView[];
    private _built: boolean;
    protected _parent: BaseView | null;
    private _props: Props;
    private _firstState: State | null;
    private _state: State;
    private _v: Variables;
    private _root: RootElement;

    static Parse(html: string): Element {
        let template = document.createElement('template');
        template.innerHTML = html.trim();
        if (template.content.children.length !== 1 || template.content.firstChild === null) {
            throw new Error("root did not detected!");
        }
        return <Element>template.content.firstChild;
    }

    /**
     * @param props: static data for building the view.
     * @param state: dynamic data for building the view.
     * @param parent: parent view of this view
     * @param lazyBuild: build the view when moveIn function called
     */
    protected constructor(props: Props, state: State, parent: BaseView | null = null, lazyBuild: boolean = false) {
        this._uid = VIEW_UID_CREATOR.getUid();
        this._subviews = [];
        this._built = !lazyBuild;
        this._parent = parent;
        this._props = props;
        this._state = this.initState();
        this._v = this.initVariables();
        if (lazyBuild) {
            this._firstState = state;
            this._root = <RootElement><unknown>null;
        } else {
            this._root = this.render(props);
            this._root.id = this._uid;
            this._firstState = null;
            this.setState(state, true);
        }
    }

    protected join(subview: BaseView): void {
        this._subviews.push(subview);
    }

    protected leave(subview: BaseView): void {
        this._subviews.splice(this._subviews.indexOf(subview), 1);
    }

    /**
     * moveIn adds this view to the document. nothing happens if neither of parent
     * @param parentNode: pass a DOM element if you don’t want to add this view as a immediate child of the parent.
     * nor {@param parentNode} has been set.
     * @param onAfter: this function will be called at the end of the animation or
     * immediately after adding if there is no animation.
     * @param animate: animate or not!
     * @param position: position of the view in parent’s children. negative number counts backward.
     */
    moveIn(parentNode: Element | null = null, position: number = -1, onAfter: (() => void) | null = null, animate: boolean = true): void {
        let targetNode: Element;
        if (parentNode !== null) {
            targetNode = parentNode;
        } else {
            targetNode = this._parent!._root;
        }
        if (!this._built) {
            this._root = this.render(this._props);
            this._root.id = this._uid;
            this.setState(this._firstState!, true);
            this._firstState = null;
            this._built = true;
        }
        this._parent!.join(this);
        if (position < 0) {
            position += targetNode.children.length + 1;
            if (position < 0) {
                position = 0;
            }
        }
        targetNode.insertBefore(this._root, targetNode.children[position]);
        if (animate) {
            this.animateIn(onAfter);
        } else {
            if (onAfter !== null) {
                onAfter();
            }
        }
    }

    /**
     * moveOut removes this view from the document.
     * @param onAfter: this function will be called at the end of the animation or
     * immediately after removing if there is no animation.
     * @param animate: animate or not!
     */
    moveOut(onAfter: (() => void) | null = null, animate: boolean = true): void {
        this._parent!.leave(this);
        if (animate) {
            this.animateOut();
            if (this.getAnimateOutDuration() === 0) {
                this._root.remove();
                if (onAfter !== null) {
                    onAfter();
                }
            } else {
                setTimeout(() => {
                    if (onAfter !== null) {
                        this._root.remove();
                        onAfter();
                    }
                }, this.getAnimateOutDuration());
            }
        } else {
            this._root.remove();
            if (onAfter !== null) {
                onAfter();
            }
        }
    }

    /**
     * animating out duration in ms.
     * @returns {number}
     */
    getAnimateOutDuration(): number {
        return 0;
    }

    /**
     * animating in duration in ms.
     * @returns {number}
     */
    getAnimateInDuration(): number {
        return 0;
    }

    /**
     * implement entrance animation. make sure you remove extra styles class at the end.
     * the animation must stop at stable position that you want to be.
     * call the super function at the end.
     */
    animateIn(onAfter: (() => void) | null = null): void {
        if (onAfter !== null) {
            if (this.getAnimateInDuration() !== 0) {
                setTimeout(onAfter, this.getAnimateInDuration());
            } else {
                onAfter();
            }
        }
    }

    /**
     * implement exit animation. make sure you remove extra styles class at the end.
     * your animation must stop when it does not affect the UI, otherwise it could cause to glitch.
     * call the super function at the end.
     */
    animateOut(onAfter: (() => void) | null = null): void {
        if (onAfter !== null) {
            if (this.getAnimateOutDuration() !== 0) {
                setTimeout(onAfter, this.getAnimateOutDuration());
            } else {
                onAfter();
            }
        }
    }

    /**
     * implement your focus flow. views divide to three types.
     * views contains:
     * 1- only subviews
     * 2- subviews and DOM elements
     * 3- only DOM elements
     * to control focus flow, you must prepared for:
     * 1- all DOM elements that focusable or you want to focus
     * 2- all views used in your views
     * pass the focus to your parent view when you reach your view borders. like: this.parent.focusMove(this.vision, direction);
     * @param target: DOM element that currently focused (it is root element for subviews.
     * you will never be notified for DOM elements of your subviews, only their root)
     * @param direction: direction is a tuple showing a range.
     * top-left: 0, right-top:1, bottom-right:2, left-bottom:3
     */
    focusMove(target: Element, direction: [start: number, lenght: number]): void {
        this._parent!.focusMove(this._root, direction);
    }

    /**
     * implement your entrance focus flow, when other views pass focus to your view,
     * you will be notified by this function.
     * @param direction: direction is a tuple showing a range.
     * top-left: 0, right-top:1, bottom-right:2, left-bottom:3
     */
    focusEnter(direction: [start: number, lenght: number]): void {
        this._parent!.focusMove(this._root, [(direction[0] + 2) % 4, direction[1]]);
    }

    destroy(): void {
        this._subviews = [];
    }

    reRender(props: Props): void {
        this.destroy();
        let parent = this._root.parentNode!;
        let position = Array.prototype.indexOf.call(parent.children, this._root);
        this._root.remove();
        this._root = this.render(props);
        if (position === parent.children.length - 1) {
            parent.appendChild(this._root);
        } else {
            parent.insertBefore(this._root, parent.children[position]);
        }
        this._props = props;
    }

    cloneProps(): Props {
        return viewClone(this.props, []);
    }

    cloneState(): State {
        return viewClone(this.state, []);
    }

    checkBuilt(): void {
        if (!this._built) {
            throw new Error("View is not built!");
        }
    }

    abstract render(props: Props): RootElement;

    setState(nextState: State, firstTime: boolean = false): void {
        this._state = nextState;
    }

    abstract initState(): State;

    abstract initVariables(): Variables;

    get uid(): string {
        return this._uid;
    }

    get subviews(): BaseView[] {
        return this._subviews;
    }

    get built(): boolean {
        return this._built;
    }

    get parent(): BaseView | null {
        return this._parent;
    }

    get props(): Props {
        return this._props;
    }

    get state(): State {
        return this._state;
    }

    get v(): Variables {
        return this._v;
    }

    get root(): RootElement {
        return this._root;
    }

    set parent(value: BaseView | null) {
        this._parent = value;
    }
}