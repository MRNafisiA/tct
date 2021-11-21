import {View} from "../../view/View";
import BasisStyle from "../../assets/basis.style.css";
import ContainerStyle from "./Container.style.css";
import {AnimationType} from "./enums/AnimationType";
import {BaseView} from "../../view/BaseView";
import {SlidPosition} from "./enums/SlidPosition";
import {FlipPosition} from "./enums/FlipPosition";

export interface Props {
    additionalClasses: string[];
    animationType: AnimationType;
}

export interface State {
    width: number | null;
    height: number | null;
    view: View | null
}

export interface Variables {
    containerDiv: HTMLDivElement | null;
    currentViewContainerDiv: HTMLDivElement;
    nextViewContainerDiv: HTMLDivElement;
}

export class Container<ParentView extends BaseView = BaseView>
    extends View<Props, State, Variables, ParentView, HTMLDivElement> {
    // abstract implementation
    initState(): State {
        return {
            width: null,
            height: null,
            view: null
        };
    }

    initVariables(): Variables {
        return {
            containerDiv: null,
            currentViewContainerDiv: document.createElement("div"),
            nextViewContainerDiv: document.createElement("div")
        };
    }

    render(props: Props): HTMLDivElement {
        let root = document.createElement("div");
        root.classList.add(BasisStyle["tct"], ContainerStyle["container"], ...props.additionalClasses);

        // animation-type
        this.buildAnimationType(root);

        return root;
    }

    // custom overrides
    setState(nextState: State): void {
        // width & height
        this.setMeasures(nextState.width, nextState.height);

        // view
        this.setView(nextState.view);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        if (this.state.view !== null) {
            this.state.view.focusEnter(direction);
        }
    }

    // private utils
    private buildAnimationType(root: HTMLDivElement): void {
        switch (this.props.animationType) {
            case AnimationType.NA:
                root.classList.add(ContainerStyle["animation-type-na"]);
                break;
            case AnimationType.SLIDE:
                root.classList.add(ContainerStyle["animation-type-slide"]);
                break;
            case AnimationType.FLIP:
                root.classList.add(ContainerStyle["animation-type-flip"]);
                this.v.containerDiv = document.createElement("div");
                root.appendChild(this.v.containerDiv);
                break;
            case AnimationType.FADE:
                root.classList.add(ContainerStyle["animation-type-fade"]);
                break;
        }
    }

    private animationSlide(target: HTMLDivElement, nextPosition: SlidPosition, removeTarget: boolean): void {
        switch (nextPosition) {
            case SlidPosition.LEFT:
                target.style.right = "100%";
                break;
            case SlidPosition.CENTER:
                target.style.right = "0";
                break;
            case SlidPosition.RIGHT:
                target.style.right = "-100%";
                break;
        }
        setTimeout(() => {
            if (removeTarget) {
                target.remove();
            }
        }, 300);
    }

    private animationFlip(target: HTMLDivElement, nextPosition: FlipPosition, removeTarget: boolean): void {
        switch (nextPosition) {
            case FlipPosition.ANTI_CLOCKWISE:
                target.style.transform = "rotateY(-180deg)";
                break;
            case FlipPosition.NORMAL:
                target.style.transform = "rotateY(0)";
                break;
            case FlipPosition.CLOCKWISE:
                target.style.transform = "rotateY(180deg)";
                break;
        }
        setTimeout(() => {
            if (removeTarget) {
                target.remove();
            }
        }, 500);
    }

    private animationFade(target: HTMLDivElement, hide: boolean, removeTarget: boolean): void {
        if (hide) {
            target.style.opacity = "0";
        } else {
            target.style.opacity = "1";
        }
        setTimeout(() => {
            if (removeTarget) {
                target.remove();
            }
        }, 500);
    }

    // view interface
    setMeasures(width: number | null, height: number | null): void {
        if (width !== null) {
            this.root.style.width = width.toString() + "rem";
        } else if (this.state.width !== null) {
            this.root.style.removeProperty("width");
        }
        if (height !== null) {
            this.root.style.height = height.toString() + "rem";
        } else if (this.state.height !== null) {
            this.root.style.removeProperty("height");
        }
        this.state.width = width;
        this.state.height = height;
    }

    setView(view: View | null, forward: boolean = true): void {
        switch (this.props.animationType) {
            case AnimationType.NA:
                if (this.state.view !== null) {
                    this.state.view.moveOut();
                }
                if (view !== null) {
                    view.parent = this;
                    view.moveIn();
                }
                break;
            case AnimationType.SLIDE:
                if (view !== null) {
                    this.v.nextViewContainerDiv = document.createElement("div");
                    view.parent = this;
                }
                if (forward) {
                    if (view !== null) {
                        this.v.nextViewContainerDiv.style.right = "100%";
                        view.moveIn(this.v.nextViewContainerDiv);
                        this.root.appendChild(this.v.nextViewContainerDiv);
                        setTimeout(() => {
                            this.animationSlide(this.v.nextViewContainerDiv, SlidPosition.CENTER, false);
                        }, 0);
                    }
                    if (this.state.view !== null) {
                        this.animationSlide(this.v.currentViewContainerDiv, SlidPosition.RIGHT, true);
                    }
                } else {
                    if (view !== null) {
                        this.v.nextViewContainerDiv.style.right = "-100%";
                        view.moveIn(this.v.nextViewContainerDiv);
                        this.root.appendChild(this.v.nextViewContainerDiv);
                        setTimeout(() => {
                            this.animationSlide(this.v.nextViewContainerDiv, SlidPosition.CENTER, false);
                        }, 0);
                    }
                    if (this.state.view !== null) {
                        this.animationSlide(this.v.currentViewContainerDiv, SlidPosition.LEFT, true);
                    }
                }
                this.v.currentViewContainerDiv = this.v.nextViewContainerDiv;
                break;
            case AnimationType.FLIP:
                if (view !== null) {
                    this.v.nextViewContainerDiv = document.createElement("div");
                    view.parent = this;
                }
                if (forward) {
                    if (view !== null) {
                        this.v.nextViewContainerDiv.style.transform = "rotateY(-180deg)";
                        view.moveIn(this.v.nextViewContainerDiv);
                        this.v.containerDiv!.appendChild(this.v.nextViewContainerDiv!);
                        setTimeout(() => {
                            this.animationFlip(this.v.nextViewContainerDiv, FlipPosition.NORMAL, false);
                        }, 0);
                    }
                    if (this.state.view !== null) {
                        this.animationFlip(this.v.currentViewContainerDiv, FlipPosition.CLOCKWISE, true);
                    }
                } else {
                    if (view !== null) {
                        this.v.nextViewContainerDiv.style.transform = "rotateY(180deg)";
                        view.moveIn(this.v.nextViewContainerDiv);
                        this.v.containerDiv!.appendChild(this.v.nextViewContainerDiv);
                        setTimeout(() => {
                            this.animationFlip(this.v.nextViewContainerDiv, FlipPosition.NORMAL, false);
                        }, 0);
                    }
                    if (this.state.view !== null) {
                        this.animationFlip(this.v.currentViewContainerDiv, FlipPosition.ANTI_CLOCKWISE, true);
                    }
                }
                this.v.currentViewContainerDiv = this.v.nextViewContainerDiv;
                break;
            case AnimationType.FADE:
                if (view !== null) {
                    this.v.nextViewContainerDiv = document.createElement("div");
                    this.v.nextViewContainerDiv.style.opacity = "0";
                    view.parent = this;
                    view.moveIn(this.v.nextViewContainerDiv);
                    this.root.appendChild(this.v.nextViewContainerDiv);
                    setTimeout(() => {
                        this.animationFade(this.v.nextViewContainerDiv, false, false);
                    }, 0);
                }
                if (this.state.view !== null) {
                    this.animationFade(this.v.currentViewContainerDiv, true, true);
                }
                this.v.currentViewContainerDiv = this.v.nextViewContainerDiv;
                break;
        }
        this.state.view = view;
    }
}