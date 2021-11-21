import {BaseView} from "../view/BaseView";
import {View} from "../view/View";
import {FOCUS_MANAGER} from "../view/FocusManager";
import {Toggle} from "../components/toggle/Toggle";
import {Condition as ToggleCondition} from "../components/toggle/enums/Condition";
import {Shape as ToggleShape} from "../components/toggle/enums/Shape";
import {Size, Size as ToggleSize} from "../components/toggle/enums/Size";
import {Status as ToggleStatus} from "../components/toggle/enums/Status";
import {Button} from "../components/button/Button";
import {Type as ButtonType} from "../components/button/enums/Type";
import {ButtonBuilder} from "../components/button/ButtonBuilder";
import {ToggleBuilder} from "../components/toggle/ToggleBuilder";
import BasisStyle from "../assets/basis.style.css";

class Container extends View<null, null> {
    initState(): null {
        return null;
    }

    initVariables(): any {
        return {};
    }

    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-1");

        let descriptionSpan = document.createElement("span");
        descriptionSpan.innerText = "Focus Flow (use alt + arrows):";
        root.appendChild(descriptionSpan);

        this.v.toggle1 = new ToggleBuilder()
            .fillProps({})
            .fillState({})
            .setParent(this)
            .build(Toggle);
        this.v.toggle1.moveIn(root);

        this.v.toggle2 = new ToggleBuilder()
            .fillProps({})
            .fillState({
                size:Size.LARGE
            })
            .setParent(this)
            .build(Toggle);
        this.v.toggle2.moveIn(root);

        this.v.toggle3 = new ToggleBuilder()
            .fillProps({})
            .fillState({
                shape: ToggleShape.SQUARE
            })
            .setParent(this)
            .build(Toggle);
        this.v.toggle3.moveIn(root);

        this.v.toggle4 = new ToggleBuilder()
            .fillProps({})
            .fillState({
                status: ToggleStatus.CHECKED,
                size: ToggleSize.LARGE,
                shape: ToggleShape.SQUARE
            })
            .setParent(this)
            .build(Toggle);
        this.v.toggle4.moveIn(root);

        return root;
    }
}

class Container2 extends View<null, null> {
    initState(): null {
        return null;
    }

    initVariables(): any {
        return {};
    }

    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-2");

        let containerDiv = document.createElement("div");
        let stateEnable = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "روشن کردن",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setStatus(ToggleStatus.CHECKED);
                }]
            })
            .setParent(this)
            .build(Button);
        stateEnable.moveIn(containerDiv);

        let stateDisable = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "خاموش کردن",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setStatus(ToggleStatus.UNCHECKED);
                }]
            })
            .setParent(this)
            .build(Button);
        stateDisable.moveIn(containerDiv);

        let conditionEnable = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "فعال کردن",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setCondition(ToggleCondition.ENABLED);
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
                    target.setCondition(ToggleCondition.DISABLED);
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
                    target.setSize(ToggleSize.MEDIUM);
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
                    target.setSize(ToggleSize.LARGE);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeLarge.moveIn(containerDiv);

        let shapeCircle = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "شکل دایره",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setShape(ToggleShape.CIRCLE);
                }]
            })
            .setParent(this)
            .build(Button);
        shapeCircle.moveIn(containerDiv);

        let shapeSquare = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "شکل مربع",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setShape(ToggleShape.SQUARE);
                }]
            })
            .setParent(this)
            .build(Button);
        shapeSquare.moveIn(containerDiv);

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
        let target = new ToggleBuilder()
            .fillProps({})
            .fillState({})
            .setParent(this)
            .build(Toggle);
        target.moveIn(containerDiv2);

        root.appendChild(containerDiv);
        root.appendChild(containerDiv2);

        return root;
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