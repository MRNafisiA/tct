import {BaseView} from "./BaseView";

export enum SimpleDirection {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT
}

class FocusManager {
    private rootViews: BaseView[] = [];
    private defaultFocusedView: BaseView | undefined;
    private defaultFocusedElement: HTMLElement | undefined;
    private focusedView: BaseView | null = null;
    private focusedElement: HTMLElement | null = null;

    init(rootViews: BaseView[], defaultView: BaseView): void {
        this.rootViews = rootViews;
        this.defaultFocusedView = defaultView;
        this.defaultFocusedElement = <HTMLElement>defaultView.root;

        document.addEventListener("focusin", (event) => {
            this.setFocus(<HTMLElement>event.target, null, false);
        });
        document.addEventListener("focusout", () => {
            this.clearFocus();
        });
        document.addEventListener("keydown", (event) => {
            if (event.altKey) {
                if (this.focusedView === null) {
                    this.resetFocusedViewAndElement();
                }
                switch (event.key) {
                    case "ArrowUp":
                        this.focusedView!.focusMove(this.focusedElement!, [0, 1]);
                        break;
                    case "ArrowRight":
                        this.focusedView!.focusMove(this.focusedElement!, [1, 1]);
                        break;
                    case "ArrowDown":
                        this.focusedView!.focusMove(this.focusedElement!, [2, 1]);
                        break;
                    case "ArrowLeft":
                        this.focusedView!.focusMove(this.focusedElement!, [3, 1]);
                        break;
                }
            }
        });
    }

    resetFocusedViewAndElement() {
        this.focusedView = this.defaultFocusedView!;
        this.focusedElement = this.defaultFocusedElement!;
    }

    findCorrespondingView(node: Node): BaseView | null {
        let parents: Node[] = [];
        let e = node;
        while (e.parentNode !== null) {
            parents.splice(0, 0, e);
            e = e.parentNode;
        }
        let targetView: BaseView | null = null;
        let searchingViews = this.rootViews;
        for (let i = 0; i < parents.length; i++) {
            for (let j = 0; j < searchingViews.length; j++) {
                if (parents[i] === searchingViews[j].root) {
                    targetView = searchingViews[j];
                    searchingViews = searchingViews[j].subviews;
                    break;
                }
            }
        }
        return targetView;
    }

    setFocus(element: HTMLElement, view: BaseView | null = null, manageUi: boolean = true): void {
        if (view === null) {
            view = this.findCorrespondingView(element);
            if (view === null) {
                this.resetFocusedViewAndElement();
                return;
            }
        }
        if (manageUi) {
            if (this.focusedElement !== null) {
                this.focusedElement.blur();
            }
            element.focus();
        }
        this.focusedView = view;
        this.focusedElement = element;
    }

    clearFocus(): void {
        this.focusedView = null;
        this.focusedElement = null;
    }
}

export function ExtractSimpleDirections(start: number, length: number): SimpleDirection[] {
    let directions = [
        SimpleDirection.TOP,
        SimpleDirection.RIGHT,
        SimpleDirection.BOTTOM,
        SimpleDirection.LEFT,
        SimpleDirection.TOP,
        SimpleDirection.RIGHT,
        SimpleDirection.BOTTOM,
        SimpleDirection.LEFT
    ];
    for (let i = 1; i < 5; i++) {
        if (start < i) {
            if (length < 2 * (i - start)) {
                return directions.slice(i - 1, i);
            } else if (length === 2 * (i - start)) {
                return directions.slice(i - 1, i + 1);
            } else if (length < i + 2 - start) {
                return directions.slice(i, i + 1);
            } else if (length < i + 3 - start) {
                return directions.slice(i, i + 2);
            } else if (length < i + 3) {
                return directions.slice(i, i + 3);
            } else {
                return directions.slice(i, i + 4);
            }
        }
    }
    return [];
}

export const FOCUS_MANAGER = new FocusManager();