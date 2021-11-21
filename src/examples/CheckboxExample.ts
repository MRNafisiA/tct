import {View} from "../view/View";
import {BaseView} from "../view/BaseView";
import {ExtractSimpleDirections, FOCUS_MANAGER, SimpleDirection} from "../view/FocusManager";
import {Checkbox} from "../components/checkbox/Checkbox";
import {CheckboxBuilder} from "../components/checkbox/CheckboxBuilder";
import {Condition as CheckboxCondition} from "../components/checkbox/enums/Condition";
import {Size as CheckboxSize} from "../components/checkbox/enums/Size";
import {Button} from "../components/button/Button";
import {ButtonBuilder} from "../components/button/ButtonBuilder";
import {Type as ButtonType} from "../components/button/enums/Type";
import {CHECKBOX_MANAGER} from "../components/checkbox/utils/Manager";
import BasisStyle from "../assets/basis.style.css";

class Container extends View<null, null> {
    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-1");

        let descriptionSpan = document.createElement("span");
        descriptionSpan.innerText = "Focus Flow (use alt + arrows):";
        root.appendChild(descriptionSpan);

        this.v.checkboxes = [];
        this.v.checkboxes[0] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 1",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[0].moveIn(root);

        this.v.checkboxes[1] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 2",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[1].moveIn(root);

        this.v.checkboxes[2] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 3",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[2].moveIn(root);

        this.v.checkboxes[3] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 4",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[3].moveIn(root);

        this.v.checkboxes[4] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 5",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[4].moveIn(root);

        this.v.checkboxes[5] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 6",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[5].moveIn(root);

        this.v.checkboxes[6] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 7",
                size: CheckboxSize.LARGE
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[6].moveIn(root);

        this.v.checkboxes[7] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 8",
                size: CheckboxSize.LARGE
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[7].moveIn(root);

        this.v.checkboxes[8] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 9",
                size: CheckboxSize.LARGE
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[8].moveIn(root);

        this.v.checkboxes[9] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 10",
                condition: CheckboxCondition.DISABLED,
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[9].moveIn(root);

        this.v.checkboxes[10] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 11",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[10].moveIn(root);

        this.v.checkboxes[11] = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 12",
                size: CheckboxSize.MEDIUM
            })
            .setParent(this)
            .build(Checkbox);
        this.v.checkboxes[11].moveIn(root);

        let nodes = [];
        nodes[0] = CHECKBOX_MANAGER.join(this.v.checkboxes[0], null);
        nodes[1] = CHECKBOX_MANAGER.join(this.v.checkboxes[1], nodes[0]);
        nodes[2] = CHECKBOX_MANAGER.join(this.v.checkboxes[2], nodes[0]);
        nodes[3] = CHECKBOX_MANAGER.join(this.v.checkboxes[3], nodes[0]);
        nodes[4] = CHECKBOX_MANAGER.join(this.v.checkboxes[4], nodes[3]);
        nodes[5] = CHECKBOX_MANAGER.join(this.v.checkboxes[5], nodes[3]);
        nodes[6] = CHECKBOX_MANAGER.join(this.v.checkboxes[6], nodes[3]);
        nodes[7] = CHECKBOX_MANAGER.join(this.v.checkboxes[7], nodes[0]);
        nodes[8] = CHECKBOX_MANAGER.join(this.v.checkboxes[8], nodes[7]);
        nodes[9] = CHECKBOX_MANAGER.join(this.v.checkboxes[9], nodes[8]);
        nodes[10] = CHECKBOX_MANAGER.join(this.v.checkboxes[10], nodes[9]);
        nodes[11] = CHECKBOX_MANAGER.join(this.v.checkboxes[11], nodes[9]);

        return root;
    }

    focusMove(target: HTMLElement, direction: [start: number, lenght: number]) {
        let simpleDirections = ExtractSimpleDirections(...direction);
        if (simpleDirections.length !== 1) {
            return;
        }
        let simpleDirection = simpleDirections[0];
        for (let i = 0; i < this.v.checkboxes.length; i++) {
            if (target === this.v.checkboxes[i].root) {
                switch (simpleDirection) {
                    case SimpleDirection.TOP:
                        this.v.checkboxes[(i === 0) ? this.v.checkboxes.length - 1 : i - 1].focusEnter([2, 1]);
                        return;
                    case SimpleDirection.BOTTOM:
                        this.v.checkboxes[(i === this.v.checkboxes.length - 1) ? 0 : i + 1].focusEnter([0, 1]);
                        return;
                }
            }
        }
    }

    initState(): null {
        return null;
    }

    initVariables(): any {
        return {};
    }
}

class Container2 extends View<null, null> {
    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-2");

        let containerDiv = document.createElement("div");
        let changeName = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "عوض کردن عنوان",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setTitle("ارسال سریع");
                }]
            })
            .setParent(this)
            .build(Button);
        changeName.moveIn(containerDiv);

        let makeNameNull = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "خالی کردن عنوان",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setTitle(null);
                }]
            })
            .setParent(this)
            .build(Button);
        makeNameNull.moveIn(containerDiv);

        let conditionEnable = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "فعال کردن",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setCondition(CheckboxCondition.ENABLED);
                }]
            })
            .setParent(this)
            .build(Button);
        conditionEnable.moveIn(containerDiv);

        let conditionDisable = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "غیر فعال کردن",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setCondition(CheckboxCondition.DISABLED);
                }]
            })
            .setParent(this)
            .build(Button);
        conditionDisable.moveIn(containerDiv);

        let sizeMedium = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "اندازه متوسط",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setSize(CheckboxSize.MEDIUM);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeMedium.moveIn(containerDiv);

        let sizeLarge = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "اندازه بزرگ",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setSize(CheckboxSize.LARGE);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeLarge.moveIn(containerDiv);

        let data: any = null;
        let snapshot = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "snapshot",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    data = target.cloneState();
                }]
            })
            .setParent(this)
            .build(Button);
        snapshot.moveIn(containerDiv);

        let restore = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "restore",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    if (data !== null) {
                        target.setState(data);
                    }
                }]
            })
            .setParent(this)
            .build(Button);
        restore.moveIn(containerDiv);

        let containerDiv2 = document.createElement("div");
        let target = new CheckboxBuilder()
            .fillProps({})
            .fillState({
                title: "ارسال سریع"
            })
            .setParent(this)
            .build(Checkbox);
        target.moveIn(containerDiv2);
        CHECKBOX_MANAGER.join(target, null);

        root.appendChild(containerDiv);
        root.appendChild(containerDiv2);

        return root;
    }

    initState(): null {
        return null;
    }

    initVariables(): any {
        return {};
    }
}

class EmptyView extends View<null, null, null, BaseView, HTMLDivElement> {
    initState(): any {
    }

    render(props: any): HTMLDivElement {
        return document.createElement("div");
    }

    initVariables(): null {
        return null;
    }
}

let root = new EmptyView(null, null);
root.root.classList.add(BasisStyle["tct-root"]);
root.root.style.display = "flex";
document.body.appendChild(root.root);

FOCUS_MANAGER.init([root], root);

let container = new Container(null, null, root);
container.moveIn();

let container2 = new Container2(null, null, root);
container2.moveIn();