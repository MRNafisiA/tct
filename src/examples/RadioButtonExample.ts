import {View} from "../view/View";
import {BaseView} from "../view/BaseView";
import {FOCUS_MANAGER} from "../view/FocusManager";
import {RadioButton} from "../components/radio-button/RadioButton";
import {RadioButtonBuilder} from "../components/radio-button/RadioButtonBuilder";
import {Condition as RadioButtonCondition} from "../components/radio-button/enums/Condition";
import {Size as RadioButtonSize} from "../components/radio-button/enums/Size";
import {Status as RadioButtonStatus} from "../components/radio-button/enums/Status";
import {Button} from "../components/button/Button";
import {Type as ButtonType} from "../components/button/enums/Type";
import {ButtonBuilder} from "../components/button/ButtonBuilder";
import {RADIO_BUTTON_MANAGER} from "../components/radio-button/utils/Manager";
import BasisStyle from "../assets/basis.style.css";

class Container extends View<null, null> {
    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-1");

        let descriptionSpan = document.createElement("span");
        descriptionSpan.innerText = "Focus Flow (use alt + arrows):";
        root.appendChild(descriptionSpan);

        this.v.radioButtons = [];
        this.v.radioButtons[0] = new RadioButtonBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 1"
            })
            .setParent(this)
            .build(RadioButton);
        this.v.radioButtons[0].moveIn(root);

        this.v.radioButtons[1] = new RadioButtonBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 2",
                size: RadioButtonSize.LARGE
            })
            .setParent(this)
            .build(RadioButton);
        this.v.radioButtons[1].moveIn(root);

        this.v.radioButtons[2] = new RadioButtonBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 3",
                size: RadioButtonSize.LARGE
            })
            .setParent(this)
            .build(RadioButton);
        this.v.radioButtons[2].moveIn(root);

        this.v.radioButtons[3] = new RadioButtonBuilder()
            .fillProps({})
            .fillState({
                title: "عنوان 4",
                size: RadioButtonSize.LARGE,
                condition: RadioButtonCondition.DISABLED,
                status: RadioButtonStatus.CHECKED
            })
            .setParent(this)
            .build(RadioButton);
        this.v.radioButtons[3].moveIn(root);

        this.v.radioButtons[4] = new RadioButtonBuilder()
            .fillProps({})
            .fillState({
                title: "جدا شده"
            })
            .setParent(this)
            .build(RadioButton);
        this.v.radioButtons[4].moveIn(root);

        let nodes = [];
        nodes[0] = RADIO_BUTTON_MANAGER.join(this.v.radioButtons[0], null)!;
        nodes[1] = RADIO_BUTTON_MANAGER.join(this.v.radioButtons[1], nodes[0].group);
        nodes[2] = RADIO_BUTTON_MANAGER.join(this.v.radioButtons[2], nodes[0].group);
        nodes[3] = RADIO_BUTTON_MANAGER.join(this.v.radioButtons[3], nodes[0].group);
        nodes[4] = RADIO_BUTTON_MANAGER.join(this.v.radioButtons[4], nodes[0].group);

        console.log(nodes);

        return root;
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
                    target.setTitle("گزینه ۱");
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
                    target.setCondition(RadioButtonCondition.ENABLED);
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
                    target.setCondition(RadioButtonCondition.DISABLED);
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
                    target.setSize(RadioButtonSize.MEDIUM);
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
                    target.setSize(RadioButtonSize.LARGE);
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
        let target = new RadioButtonBuilder()
            .fillProps({})
            .fillState({
                title: "گزینه ۱"
            })
            .setParent(this)
            .build(RadioButton);
        target.moveIn(containerDiv2);

        RADIO_BUTTON_MANAGER.join(target, null)!;

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