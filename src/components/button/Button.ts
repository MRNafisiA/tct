import {View} from "../../view/View";
import {BaseView} from "../../view/BaseView";
import {FOCUS_MANAGER} from "../../view/FocusManager";
import BasisStyle from "../../assets/basis.style.css";
import ButtonStyle from "./Button.style.css";
import {Condition} from "./enums/Condition";
import {Size} from "./enums/Size";
import {Type} from "./enums/Type";

export interface Props {
    additionalClasses: string[];
}

export interface State {
    title: string | null;
    iconView: View<any, any, any, Button> | null;
    condition: Condition;
    size: Size;
    type: Type;
    onClicks: ((event: MouseEvent) => void)[];
}

export interface Variables {
    titleSpan: HTMLSpanElement | null;
    iconContainerDiv: HTMLDivElement;
}

export class Button<ParentView extends BaseView = BaseView>
    extends View<Props, State, Variables, ParentView, HTMLButtonElement> {
    // abstract implementation
    initState(): State {
        return {
            title: null,
            iconView: null,
            condition: <Condition><unknown>null,
            size: <Size><unknown>null,
            type: <Type><unknown>null,
            onClicks: []
        };
    }

    initVariables(): Variables {
        return {
            titleSpan: null,
            iconContainerDiv: document.createElement("div")
        };
    }

    render(props: Props): HTMLButtonElement {
        let root = document.createElement("button");
        root.classList.add(BasisStyle["tct"], ButtonStyle["button"], ...props.additionalClasses);
        root.addEventListener("click", () => {
            root.classList.add(ButtonStyle["click-animation"]);
            setTimeout(() => {
                root.classList.remove(ButtonStyle["click-animation"]);
            }, 300);
        });

        return root;
    }

    // custom overrides
    setState(nextState: State): void {
        // size
        this.setSize(nextState.size);

        // type
        this.setType(nextState.type);

        // condition
        this.setCondition(nextState.condition);

        // icon
        this.SetIcon(nextState.iconView);

        // title
        this.setTitle(nextState.title);

        // onClicks
        this.setOnClicks(nextState.onClicks);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        if (this.state.condition === Condition.DISABLED) {
            super.focusEnter(direction);
        } else {
            FOCUS_MANAGER.setFocus(<HTMLElement>this.root, this);
        }
    }

    // view api
    setTitle(title: string | null): void {
        if (this.state.title === null) {
            if (title !== null) {
                this.v.titleSpan = document.createElement("span");
                this.v.titleSpan.innerText = title;
                this.root.appendChild(this.v.titleSpan);
                this.root.classList.add(ButtonStyle["contains-text"]);
            }
        } else {
            if (title === null) {
                this.v.titleSpan!.remove();
                this.v.titleSpan = null;
                this.root.classList.remove(ButtonStyle["contains-text"]);
            } else {
                this.v.titleSpan!.innerText = title;
            }
        }
        this.state.title = title;
    }

    SetIcon(iconView: View<any, any, any, Button> | null): void {
        if (this.state.iconView !== null) {
            this.state.iconView.moveOut();
            this.v.iconContainerDiv.remove();
        }
        if (iconView !== null) {
            iconView.parent = this;
            iconView.moveIn(this.v.iconContainerDiv);
            if (this.root.children.length === 0) {
                this.root.appendChild(this.v.iconContainerDiv);
            } else {
                this.root.insertBefore(this.v.iconContainerDiv, this.root.children[0]);
            }
        }
        this.state.iconView = iconView;
    }

    setCondition(condition: Condition): void {
        switch (this.state.condition) {
            case  Condition.ENABLED:
                this.root.classList.remove(ButtonStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.root.classList.remove(ButtonStyle["condition-disabled"]);
                break;
        }
        switch (condition) {
            case  Condition.ENABLED:
                this.root.disabled = false;
                this.root.classList.add(ButtonStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.root.disabled = true;
                this.root.classList.add(ButtonStyle["condition-disabled"]);
                break;
        }
        this.state.condition = condition;
    }

    setType(type: Type): void {
        switch (this.state.type) {
            case Type.TEXT:
                this.root.classList.remove(ButtonStyle["type-text"]);
                break;
            case Type.OUTLINED:
                this.root.classList.remove(ButtonStyle["type-outlined"]);
                break;
            case Type.CONTAINED:
                this.root.classList.remove(ButtonStyle["type-contained"]);
                break;
        }
        switch (type) {
            case Type.TEXT:
                this.root.classList.add(ButtonStyle["type-text"]);
                break;
            case Type.OUTLINED:
                this.root.classList.add(ButtonStyle["type-outlined"]);
                break;
            case Type.CONTAINED:
                this.root.classList.add(ButtonStyle["type-contained"]);
                break;
        }
        this.state.type = type;
    }

    setSize(size: Size): void {
        switch (this.state.size) {
            case Size.MEDIUM:
                this.root.classList.remove(ButtonStyle["size-medium"]);
                break;
            case Size.LARGE:
                this.root.classList.remove(ButtonStyle["size-large"]);
                break;
        }
        switch (size) {
            case Size.MEDIUM:
                this.root.classList.add(ButtonStyle["size-medium"]);
                break;
            case Size.LARGE:
                this.root.classList.add(ButtonStyle["size-large"]);
                break;
        }
        this.state.size = size;
    }

    setOnClicks(onClicks: ((event: MouseEvent) => void)[]) {
        for (const onClick of this.state.onClicks) {
            this.root.removeEventListener("click", onClick);
        }
        for (const onClick of onClicks) {
            this.root.addEventListener("click", onClick);
        }
        this.state.onClicks = onClicks;
    }

    addOnClick(onClick: (event: MouseEvent) => void): void {
        this.state.onClicks.push(onClick);
        this.root.addEventListener("click", onClick);
    }

    removeOnClick(onClick: (event: MouseEvent) => void): void {
        this.state.onClicks.splice(this.state.onClicks.indexOf(onClick), 1);
        this.root.removeEventListener("click", onClick);
    }
}