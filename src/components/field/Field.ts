import {View} from "../../view/View";
import {FOCUS_MANAGER} from "../../view/FocusManager";
import {convertPersianNumberToEnglishNumber} from "../../utils/conversionUtil";
import BasisStyle from "../../assets/basis.style.css";
import FieldStyle from "./Field.style.css";
import {Type} from "./enums/Type";
import {Filter} from "./enums/Filter";
import {Size} from "./enums/Size";
import {Condition} from "./enums/Condition";
import {Status} from "./enums/Status";
import {BaseView} from "../../view/BaseView";
import {TrashSvg} from "../../assets/svg/solid/TrashSvg";
import {Message} from "./types/Message";
import {Item} from "./types/Item";
import {StatusUpdater} from "./types/StatusUpdater";
import {MessageUpdater} from "./types/MessageUpdater";

export interface Props {
    additionalClasses: string[];
    type: Type;
    lazyStatusUpdater: boolean;
    lazyMessageUpdater: boolean;
}

export interface State {
    title: string;
    value: string;
    items: Item[];
    message: Message | null;
    placeholder: string;
    filters: Filter[];
    size: Size;
    status: Status;
    condition: Condition;
    onChanges: ((value: string) => void)[];
    onClicks: ((event: MouseEvent) => void)[];
    onKeyUps: ((event: KeyboardEvent) => void)[];
    statusUpdater: StatusUpdater | null;
    messageUpdater: MessageUpdater | null;
}

export interface Variables {
    titleSpan: HTMLSpanElement;
    itemsUl: HTMLUListElement;
    fieldInput: HTMLInputElement | HTMLTextAreaElement;
    messageSpan: HTMLSpanElement;
    messageIconDiv: HTMLDivElement;
    statusUpdaterTimeout: NodeJS.Timeout | null;
    statusUpdaterOrder: number;
    messageUpdaterTimeout: NodeJS.Timeout | null;
    messageUpdaterOrder: number;
    checking: boolean;
    readyToDeleteItems: boolean;
}

export class Field<ParentView extends BaseView = BaseView>
    extends View<Props, State, Variables, ParentView, HTMLDivElement> {
    // abstract implementation
    initState(): State {
        return {
            title: "",
            value: "",
            items: [],
            message: null,
            placeholder: "",
            filters: [],
            size: <Size><unknown>null,
            status: <Status><unknown>null,
            condition: <Condition><unknown>null,
            onChanges: [],
            onClicks: [],
            onKeyUps: [],
            statusUpdater: null,
            messageUpdater: null
        };
    }

    initVariables(): Variables {
        return {
            titleSpan: document.createElement("span"),
            itemsUl: document.createElement("ul"),
            fieldInput: <HTMLInputElement><unknown>null,
            messageSpan: document.createElement("span"),
            messageIconDiv: document.createElement("div"),
            statusUpdaterTimeout: null,
            statusUpdaterOrder: 0,
            messageUpdaterTimeout: null,
            messageUpdaterOrder: 0,
            checking: false,
            readyToDeleteItems: false
        };
    }

    render(props: Props): HTMLDivElement {
        let root = document.createElement("div");
        root.classList.add(BasisStyle["tct"], FieldStyle["field"], ...props.additionalClasses);

        // input
        let inputLabel = document.createElement("label");
        this.buildType(props.type);
        const lockedItemErrorAnimation = (li: HTMLLIElement) => {
            li.classList.add(FieldStyle["locked-item-error-animation"]);
            setTimeout(() => {
                li.classList.remove(FieldStyle["locked-item-error-animation"]);
            }, 500);
        };
        const handleBackspaceItemsRemoval = (event: KeyboardEvent) => {
            if (this.state.value === "" && event.key === "Backspace") {
                if (this.v.readyToDeleteItems && this.state.items.length > 0) {
                    let lastChild = this.state.items[this.state.items.length - 1];
                    if (lastChild.locked) {
                        lockedItemErrorAnimation(<HTMLLIElement>this.v.itemsUl.lastChild);
                    } else {
                        this.removeItem(lastChild.id);
                    }
                } else {
                    this.v.readyToDeleteItems = true;
                }
            } else {
                this.v.readyToDeleteItems = false;
            }
        };
        (<HTMLInputElement>this.v.fieldInput).addEventListener("click", (event) => {
            for (const onClick of this.state.onClicks) {
                onClick(event);
            }
        });
        (<HTMLInputElement>this.v.fieldInput).addEventListener("keyup", (event) => {
            handleBackspaceItemsRemoval(event);
            for (const onKeyUp of this.state.onKeyUps) {
                onKeyUp(event);
            }
        });
        this.v.fieldInput.oninput = () => {
            this.setValue(this.v.fieldInput.value);
        };

        // message
        let messageDiv = document.createElement("div");

        inputLabel.appendChild(this.v.itemsUl);
        inputLabel.appendChild(this.v.fieldInput);
        inputLabel.appendChild(this.v.titleSpan);
        messageDiv.appendChild(this.v.messageIconDiv);
        messageDiv.appendChild(this.v.messageSpan);
        root.appendChild(inputLabel);
        root.appendChild(messageDiv);

        return root;
    }

    // custom overrides
    setState(nextState: State): void {
        // filters
        this.setFilters(nextState.filters);

        // title
        this.setTitle(nextState.title);

        // onChanges
        this.setOnChanges(nextState.onChanges);

        // onClicks
        this.setOnClicks(nextState.onClicks);

        // onKeyUps
        this.setOnKeyUps(nextState.onKeyUps);

        // statusUpdater
        this.setStatusUpdater(nextState.statusUpdater);

        // messageUpdater
        this.setMessageUpdater(nextState.messageUpdater);

        // size
        this.setSize(nextState.size);

        // placeHolder
        this.setPlaceholder(nextState.placeholder);

        // condition
        this.setCondition(nextState.condition);

        // items
        this.setItems(nextState.items);

        // status
        this.setStatus(nextState.status);

        // value
        this.setValue(nextState.value);

        // message
        this.setMessage(nextState.message);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        if (this.state.condition === Condition.DISABLED) {
            super.focusEnter(direction);
        } else {
            FOCUS_MANAGER.setFocus(this.v.fieldInput, this);
        }
    }

    // private utils
    private buildType(type: Type): void {
        switch (type) {
            case Type.TEXT:
            case Type.EMAIL:
            case Type.PASSWORD:
            case Type.DATE:
            case Type.NUMBER:
            case Type.NUMBER_POSITIVE:
            case Type.NUMBER_NEGATIVE:
                this.v.fieldInput = document.createElement("input");
                break
            case Type.TEXT_AREA:
                this.v.fieldInput = document.createElement("textarea");
                break;
        }
        switch (type) {
            case Type.TEXT:
                (<HTMLInputElement>this.v.fieldInput).type = "text";
                break;
            case Type.EMAIL:
                (<HTMLInputElement>this.v.fieldInput).type = "email";
                break;
            case Type.PASSWORD:
                (<HTMLInputElement>this.v.fieldInput).type = "password";
                break;
            case Type.DATE:
                (<HTMLInputElement>this.v.fieldInput).type = "date";
                break;
            case Type.NUMBER:
            case Type.NUMBER_POSITIVE:
            case Type.NUMBER_NEGATIVE:
                (<HTMLInputElement>this.v.fieldInput).type = "number";
                break;
        }
    }

    private getFilteredValue(value: string): string {
        if (this.state.filters.includes(Filter.ENGLISH_NUMBER_ONLY)) {
            value = convertPersianNumberToEnglishNumber(value);
        }
        return value;
    }

    // view interface
    setTitle(title: string): void {
        this.v.titleSpan.innerText = title;
        this.state.title = title;
    }

    setSize(size: Size): void {
        switch (this.state.size) {
            case  Size.SMALL:
                this.root.classList.remove(FieldStyle["size-small"]);
                break;
            case  Size.MEDIUM:
                this.root.classList.remove(FieldStyle["size-medium"]);
                break;
            case  Size.LARGE:
                this.root.classList.remove(FieldStyle["size-large"]);
                break;
        }
        switch (size) {
            case  Size.SMALL:
                this.root.classList.add(FieldStyle["size-small"]);
                break;
            case  Size.MEDIUM:
                this.root.classList.add(FieldStyle["size-medium"]);
                break;
            case  Size.LARGE:
                this.root.classList.add(FieldStyle["size-large"]);
                break;
        }
        this.state.size = size;
    }

    setStatus(status: Status): void {
        switch (this.state.status) {
            case  Status.DEFAULT:
                this.root.classList.remove(FieldStyle["status-default"]);
                break;
            case  Status.VALID:
                this.root.classList.remove(FieldStyle["status-valid"]);
                break;
            case  Status.INVALID:
                this.root.classList.remove(FieldStyle["status-invalid"]);
                break;
        }
        switch (status) {
            case  Status.DEFAULT:
                this.root.classList.add(FieldStyle["status-default"]);
                break;
            case  Status.VALID:
                this.root.classList.add(FieldStyle["status-valid"]);
                break;
            case  Status.INVALID:
                this.root.classList.add(FieldStyle["status-invalid"]);
                break;
        }
        this.state.status = status;
    }

    setCondition(condition: Condition): void {
        switch (this.state.condition) {
            case  Condition.ENABLED:
                this.root.classList.remove(FieldStyle["condition-enabled"]);
                break;
            case  Condition.DISABLED:
                this.root.classList.remove(FieldStyle["condition-disabled"]);
                break;
        }
        switch (condition) {
            case  Condition.ENABLED:
                this.v.fieldInput.disabled = false;
                this.root.classList.add(FieldStyle["condition-enabled"]);
                this.v.fieldInput.placeholder = this.state.placeholder;
                break;
            case  Condition.DISABLED:
                this.v.fieldInput.disabled = true;
                this.root.classList.add(FieldStyle["condition-disabled"]);
                this.v.fieldInput.placeholder = "";
                break;
        }
        this.state.condition = condition;
    }

    setPlaceholder(placeholder: string): void {
        this.v.fieldInput.placeholder = placeholder;
        this.state.placeholder = placeholder;
    }

    setValue(value: string): void {
        this.state.value = this.getFilteredValue(value);
        this.v.fieldInput.value = this.state.value;
        this.updateStatus();
        this.updateMessage();
        for (const onChange of this.state.onChanges) {
            onChange(this.state.value);
        }
    }

    setItems(items: Item[]): void {
        while (this.v.itemsUl.lastChild) {
            this.v.itemsUl.lastChild.remove();
        }
        this.state.items = [];
        for (const item of items) {
            this.addItem(item);
        }
    }

    addItem(item: Item, index: number = -1): void {
        if (index < 0) {
            index = +this.state.items.length;
        }

        let li = document.createElement("li");
        if (item.locked) {
            li.classList.add(FieldStyle["item-locked"]);
        }
        li.innerText = item.value;
        let removeDiv = document.createElement("div");
        new TrashSvg(this).moveIn(removeDiv);
        li.appendChild(removeDiv);
        li.addEventListener("click", () => {
            if (!item.locked && this.state.condition !== Condition.DISABLED) {
                this.removeItem(item.id);
            }
        });

        this.state.items.splice(index, 0, item);
        this.v.itemsUl.insertBefore(li, this.v.itemsUl.children[index]);
    }

    removeItem(id: string): Item | null {
        let index = this.state.items.findIndex((value: Item) => value.id === id);
        if (index === -1) {
            return null;
        }
        this.v.itemsUl.removeChild(this.v.itemsUl.children[index]);
        return this.state.items.splice(index, 1)[0];
    }

    setMessage(message: Message | null): void {
        if (this.state.message !== null) {
            this.state.message.icon.moveOut();
            if (message === null) {
                this.root.classList.remove(FieldStyle["contain-message"]);
                this.v.messageSpan.innerText = "";
            }
        }
        if (message !== null) {
            this.v.messageSpan.innerText = message.text;
            message.icon.parent = this;
            message.icon.moveIn(this.v.messageIconDiv);
            if (this.state.message === null) {
                this.root.classList.add(FieldStyle["contain-message"]);
            }
        }
        this.state.message = message;
    }

    setOnChanges(onChanges: ((value: string) => void)[]): void {
        this.state.onChanges = onChanges;
    }

    addOnChange(onChange: (value: string) => void): void {
        this.state.onChanges.push(onChange);
    }

    removeOnChange(onChange: (value: string) => void): void {
        this.state.onChanges.splice(this.state.onChanges.indexOf(onChange), 1);
    }

    setOnClicks(onClicks: ((event: MouseEvent) => void)[]): void {
        this.state.onClicks = onClicks;
    }

    addOnClick(onClick: (event: MouseEvent) => void): void {
        this.state.onClicks.push(onClick);
    }

    removeOnclick(onClick: (event: MouseEvent) => void): void {
        this.state.onClicks.splice(this.state.onClicks.indexOf(onClick), 1);
    }

    setOnKeyUps(onKeyUps: ((event: KeyboardEvent) => void)[]): void {
        this.state.onKeyUps = onKeyUps;
    }

    addOnKeyUp(onKeyUp: (event: KeyboardEvent) => void): void {
        this.state.onKeyUps.push(onKeyUp);
    }

    removeOnKeyUp(onKeyUp: (event: KeyboardEvent) => void): void {
        this.state.onKeyUps.splice(this.state.onKeyUps.indexOf(onKeyUp), 1);
    }

    setFilters(filters: Filter[]): void {
        this.state.filters = filters;
    }

    addFilter(filter: Filter): void {
        this.state.filters.push(filter);
    }

    removeFilter(filter: Filter): void {
        this.state.filters.splice(this.state.filters.indexOf(filter), 1);
    }

    setStatusUpdater(statusUpdater: StatusUpdater | null): void {
        this.state.statusUpdater = statusUpdater;
    }

    setMessageUpdater(messageUpdater: MessageUpdater | null): void {
        this.state.messageUpdater = messageUpdater;
    }

    getValue(): string {
        return this.getFilteredValue(this.v.fieldInput.value);
    }

    updateStatus(): void {
        if (this.state.statusUpdater === null) {
            return;
        }
        if (this.props.lazyStatusUpdater) {
            if (!this.v.checking) {
                this.root.classList.add(FieldStyle["checking"]);
                this.v.checking = true;
            }
            if (this.v.statusUpdaterTimeout !== null) {
                clearTimeout(this.v.statusUpdaterTimeout);
            }
            this.v.statusUpdaterTimeout = setTimeout(() => {
                this.updateStatusImmediately();
                this.v.statusUpdaterTimeout = null;
            }, 10);
        } else {
            this.updateStatusImmediately();
        }
    }

    updateMessage(): void {
        if (this.state.messageUpdater === null) {
            return;
        }
        if (this.props.lazyMessageUpdater) {
            if (this.v.messageUpdaterTimeout !== null) {
                clearTimeout(this.v.messageUpdaterTimeout);
            }
            this.v.messageUpdaterTimeout = setTimeout(() => {
                this.updateMessageImmediately();
                this.v.messageUpdaterTimeout = null;
            }, 300);
        } else {
            this.updateMessageImmediately();
        }
    }

    updateStatusImmediately(): void {
        if (this.state.statusUpdater === null) {
            return;
        }
        this.state.statusUpdater(this.state.value,
            (status: Status, id: number) => {
                if (id === this.v.statusUpdaterOrder) {
                    this.root.classList.remove(FieldStyle["checking"]);
                    this.v.checking = false;
                    this.setStatus(status);
                }
            }, ++this.v.statusUpdaterOrder);
    }

    updateMessageImmediately(): void {
        if (this.state.messageUpdater === null) {
            return;
        }
        this.state.messageUpdater(this.state.value,
            (message: Message | null, id: number) => {
                if (id === this.v.messageUpdaterOrder) {
                    this.setMessage(message);
                }
            }, ++this.v.messageUpdaterOrder);
    }
}