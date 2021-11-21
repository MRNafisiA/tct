import {View} from "../../view/View";
import {FOCUS_MANAGER} from "../../view/FocusManager";
import BasisStyle from "../../assets/basis.style.css";
import ToggleStyle from "./Toggle.style.css";
import {Size} from "./enums/Size";
import {Status} from "./enums/Status";
import {Condition} from "./enums/Condition";
import {Shape} from "./enums/Shape";
import {BaseView} from "../../view/BaseView";

export interface Props {
    additionalClasses: string[];
}

export interface State {
    status: Status;
    size: Size;
    condition: Condition;
    shape: Shape;
    onChanges: ((state: State) => void)[];
}

interface Variables {
    checkboxInput: HTMLInputElement;
}

export class Toggle<ParentView extends BaseView = BaseView>
    extends View<Props, State, Variables, ParentView, HTMLLabelElement> {
    // abstract implementation
    initState(): State {
        return {
            status: <Status><unknown>null,
            size: <Size><unknown>null,
            condition: <Condition><unknown>null,
            shape: <Shape><unknown>null,
            onChanges: []
        };
    }

    initVariables(): Variables {
        return {
            checkboxInput: document.createElement("input")
        };
    }

    render(props: Props): HTMLLabelElement {
        let root = document.createElement("label");
        root.classList.add(BasisStyle["tct"], ToggleStyle["toggle"], ...props.additionalClasses);

        // input
        this.v.checkboxInput.type = "checkbox";
        this.v.checkboxInput.addEventListener("click", () => {
            this.click();
        });
        this.v.checkboxInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                this.click();
            }
        });

        // toggleSpan
        let toggleSpan = document.createElement("span");

        root.appendChild(this.v.checkboxInput);
        root.appendChild(toggleSpan);

        return root;
    }

    // custom overrides
    setState(nextState: State): void {
        // shape
        this.setShape(nextState.shape);

        // size
        this.setSize(nextState.size);

        // onChanges
        this.setOnChanges(nextState.onChanges);

        // state
        this.setStatus(nextState.status);

        // condition
        this.setCondition(nextState.condition);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        if (this.state.condition === Condition.DISABLED) {
            super.focusEnter(direction);
        } else {
            FOCUS_MANAGER.setFocus(this.v.checkboxInput, this);
        }
    }

    // view interface
    setCondition(condition: Condition): void {
        switch (this.state.condition) {
            case  Condition.ENABLED:
                this.root.classList.remove(ToggleStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.root.classList.remove(ToggleStyle["condition-disabled"]);
                break;
        }
        switch (condition) {
            case  Condition.ENABLED:
                this.v.checkboxInput.disabled = false;
                this.root.classList.add(ToggleStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.v.checkboxInput.disabled = true;
                this.root.classList.add(ToggleStyle["condition-disabled"]);
                break;
        }
        this.state.condition = condition;
    }

    setStatus(status: Status): void {
        if (this.state.status === status) {
            return;
        }
        switch (status) {
            case Status.UNCHECKED:
                this.root.classList.remove(ToggleStyle["status-checked"]);
                this.v.checkboxInput.checked = false;
                break;
            case Status.CHECKED:
                this.root.classList.add(ToggleStyle["status-checked"]);
                this.v.checkboxInput.checked = true;
                break;
        }
        this.state.status = status;
    }

    setSize(size: Size): void {
        switch (this.state.size) {
            case Size.MEDIUM:
                this.root.classList.remove(ToggleStyle["size-medium"]);
                break;
            case Size.LARGE:
                this.root.classList.remove(ToggleStyle["size-large"]);
                break;
        }
        switch (size) {
            case Size.MEDIUM:
                this.root.classList.add(ToggleStyle["size-medium"]);
                break;
            case Size.LARGE:
                this.root.classList.add(ToggleStyle["size-large"]);
                break;
        }
        this.state.size = size;
    }

    setShape(shape: Shape): void {
        switch (this.state.shape) {
            case Shape.CIRCLE:
                this.root.classList.remove(ToggleStyle["shape-circle"]);
                break;
            case Shape.SQUARE:
                this.root.classList.remove(ToggleStyle["shape-square"]);
                break;
        }
        switch (shape) {
            case Shape.CIRCLE:
                this.root.classList.add(ToggleStyle["shape-circle"]);
                break;
            case Shape.SQUARE:
                this.root.classList.add(ToggleStyle["shape-square"]);
                break;
        }
        this.state.shape = shape;
    }

    setOnChanges(onChanges: ((state: State) => void)[]): void {
        this.state.onChanges = onChanges;
    }

    addOnChange(onChange: (state: State) => void): void {
        this.state.onChanges.push(onChange);
    }

    removeOnChange(onChange: (state: State) => void): void {
        this.state.onChanges.splice(this.state.onChanges.indexOf(onChange), 1);
    }

    click(): void {
        switch (this.state.status) {
            case Status.CHECKED:
                this.setStatus(Status.UNCHECKED);
                break;
            case Status.UNCHECKED:
                this.setStatus(Status.CHECKED);
                break;
        }
    }
}