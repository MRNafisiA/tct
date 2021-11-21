import {BaseView} from "./BaseView";

export abstract class View<Props = any, State = any, Variables = any, ParentView extends BaseView = BaseView, RootElement extends Element = Element>
    extends BaseView<Props, State, Variables, RootElement> {
    protected _parent!: ParentView | null;

    constructor(props: Props, state: State, parent: ParentView | null = null, lazyBuild: boolean = false) {
        super(props, state, parent, lazyBuild);
    }

    get parent(): ParentView | null {
        return this._parent;
    }

    set parent(value: ParentView | null) {
        this._parent = value;
    }
}