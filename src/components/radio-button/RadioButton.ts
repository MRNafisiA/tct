import {View} from "../../view/View";
import {FOCUS_MANAGER} from "../../view/FocusManager";
import BasisStyle from "../../assets/basis.style.css";
import RadioButtonStyle from "./RadioButton.style.css";
import {Size} from "./enums/Size";
import {Condition} from "./enums/Condition";
import {Status} from "./enums/Status";
import {BaseView} from "../../view/BaseView";
import {Svg} from "../../assets/svg/Svg";
import {CircleSvg} from "../../assets/svg/regular/CircleSvg";
import {CheckCircleSvg} from "../../assets/svg/solid/CheckCircleSvg";

export interface Props {
    additionalClasses: string[];
}

export interface State {
    title: string | null;
    status: Status;
    size: Size;
    condition: Condition;
    onChanges: ((oldStatus: Status, status: Status) => void)[];
    onClicks: ((event: MouseEvent | KeyboardEvent) => void)[];
}

interface Variables {
    radioButtonInput: HTMLInputElement;
    titleSpan: HTMLSpanElement | null;
    statusContainerDiv: HTMLDivElement;
    stateSvg: Svg;
}

export class RadioButton<ParentView extends BaseView = BaseView>
    extends View<Props, State, Variables, ParentView, HTMLLabelElement> {
    // abstract implementation
    initState(): State {
        return {
            title: null,
            status: <Status><unknown>null,
            size: <Size><unknown>null,
            condition: <Condition><unknown>null,
            onChanges: [],
            onClicks: []
        };
    }

    initVariables(): Variables {
        return {
            radioButtonInput: document.createElement("input"),
            titleSpan: null,
            statusContainerDiv: document.createElement("div"),
            stateSvg: <Svg><unknown>null
        };
    }

    render(props: Props): HTMLLabelElement {
        let root = document.createElement("label");
        root.classList.add(BasisStyle["tct"], RadioButtonStyle["radio-button"], ...props.additionalClasses);

        // input
        this.v.radioButtonInput.type = "checkbox";
        this.v.radioButtonInput.addEventListener("click", (event: MouseEvent) => {
            this.click(event);
        });
        this.v.radioButtonInput.addEventListener("keyup", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                this.click(event);
            }
        });

        root.appendChild(this.v.radioButtonInput);
        root.appendChild(this.v.statusContainerDiv);

        return root;
    }

    // custom overrides
    setState(nextState: State): void {
        // size
        this.setSize(nextState.size);

        // title
        this.setTitle(nextState.title);

        // onChange
        this.setOnChanges(nextState.onChanges);

        // parentNode
        this.setStatus(nextState.status);

        // condition
        this.setCondition(nextState.condition);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        if (this.state.condition === Condition.DISABLED) {
            super.focusEnter(direction);
        } else {
            FOCUS_MANAGER.setFocus(this.v.radioButtonInput, this);
        }
    }

    // private utils
    private changeAnimation(): void {
        this.root.classList.add(RadioButtonStyle["click-animation"]);
        setTimeout(() => {
            this.root.classList.remove(RadioButtonStyle["click-animation"]);
        }, 300);
    }

    // view interface
    setTitle(title: string | null): void {
        if (this.state.title === null) {
            if (title !== null) {
                this.v.titleSpan = document.createElement("span");
                this.v.titleSpan.innerText = title;
                this.root.appendChild(this.v.titleSpan);
            }
        } else {
            if (title === null) {
                this.root.removeChild(this.v.titleSpan!);
                this.v.titleSpan = null;
            } else {
                this.v.titleSpan!.innerText = title;
            }
        }
        this.state.title = title;
    }

    setCondition(condition: Condition): void {
        switch (this.state.condition) {
            case  Condition.ENABLED:
                this.root.classList.remove(RadioButtonStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.root.classList.remove(RadioButtonStyle["condition-disabled"]);
                break;
        }
        switch (condition) {
            case  Condition.ENABLED:
                this.v.radioButtonInput.disabled = false;
                this.root.classList.add(RadioButtonStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.v.radioButtonInput.disabled = true;
                this.root.classList.add(RadioButtonStyle["condition-disabled"]);
                break;
        }
        this.state.condition = condition;
    }

    setStatus(status: Status): void {
        switch (this.state.status) {
            case Status.CHECKED:
            case Status.UNCHECKED:
                this.v.stateSvg.moveOut();
        }
        switch (status) {
            case Status.UNCHECKED:
                this.v.radioButtonInput.checked = false;
                this.v.stateSvg = new CircleSvg(this);
                this.v.stateSvg.moveIn(this.v.statusContainerDiv);
                break;
            case Status.CHECKED:
                this.v.radioButtonInput.checked = true;
                this.v.stateSvg = new CheckCircleSvg(this);
                this.v.stateSvg.moveIn(this.v.statusContainerDiv);
                break;
        }
        this.changeAnimation();
        for (const onChange of this.state.onChanges) {
            onChange(this.state.status, status);
        }
        this.state.status = status;
    }

    setSize(size: Size): void {
        switch (this.state.size) {
            case Size.MEDIUM:
                this.root.classList.remove(RadioButtonStyle["size-medium"]);
                break;
            case Size.LARGE:
                this.root.classList.remove(RadioButtonStyle["size-large"]);
                break;
        }
        switch (size) {
            case Size.MEDIUM:
                this.root.classList.add(RadioButtonStyle["size-medium"]);
                break;
            case Size.LARGE:
                this.root.classList.add(RadioButtonStyle["size-large"]);
                break;
        }
        this.state.size = size;
    }

    setOnChanges(onChange: ((oldStatus: Status, status: Status) => void)[]) {
        this.state.onChanges = onChange;
    }

    addOnChange(onChange: (oldStatus: Status, status: Status) => void): void {
        this.state.onChanges.push(onChange);
    }

    removeOnChange(onChange: (oldStatus: Status, status: Status) => void): void {
        this.state.onChanges.splice(this.state.onChanges.indexOf(onChange), 1);
    }

    setOnClicks(onClicks: ((event: MouseEvent | KeyboardEvent) => void)[]) {
        this.state.onClicks = onClicks;
    }

    addOnClick(onClick: (event: MouseEvent | KeyboardEvent) => void): void {
        this.state.onClicks.push(onClick);
    }

    removeOnClick(onClick: (event: MouseEvent | KeyboardEvent) => void): void {
        this.state.onClicks.splice(this.state.onClicks.indexOf(onClick), 1);
    }

    click(event: MouseEvent | KeyboardEvent): void {
        for (const onClick of this.state.onClicks) {
            onClick(event);
        }
    }

    errorAnimation(): void {
        this.root.classList.add(RadioButtonStyle["error-animation"]);
        setTimeout(() => {
            this.root.classList.remove(RadioButtonStyle["error-animation"]);
        }, 500);
    }
}