import {View} from "../view/View";
import {Button, State} from "../components/button/Button";
import {ExtractSimpleDirections, FOCUS_MANAGER, SimpleDirection} from "../view/FocusManager";
import {DownloadSvg} from "../assets/svg/solid/DownloadSvg";
import {BaseView} from "../view/BaseView";
import {ButtonBuilder} from "../components/button/ButtonBuilder";
import {Size as ButtonSize} from "../components/button/enums/Size";
import {Type as ButtonType} from "../components/button/enums/Type";
import {Condition, Condition as ButtonCondition} from "../components/button/enums/Condition";
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
        this.v.buttons = [];

        this.v.buttons[0] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                iconView: new DownloadSvg(),
                type: ButtonType.TEXT
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[0].moveIn(root);

        this.v.buttons[1] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دانلود",
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                type: ButtonType.TEXT
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[1].moveIn(root);

        this.v.buttons[2] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دانلود",
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                iconView: new DownloadSvg(),
                type: ButtonType.TEXT
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[2].moveIn(root);

        this.v.buttons[3] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                iconView: new DownloadSvg(),
                type: ButtonType.OUTLINED
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[3].moveIn(root);

        this.v.buttons[4] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دانلود",
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                type: ButtonType.OUTLINED
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[4].moveIn(root);

        this.v.buttons[5] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دانلود",
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                iconView: new DownloadSvg(),
                type: ButtonType.OUTLINED
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[5].moveIn(root);

        this.v.buttons[6] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                iconView: new DownloadSvg(),
                type: ButtonType.CONTAINED
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[6].moveIn(root);

        this.v.buttons[7] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دانلود",
                size: ButtonSize.MEDIUM,
                type: ButtonType.CONTAINED,
                condition: ButtonCondition.DISABLED
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[7].moveIn(root);

        this.v.buttons[8] = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دانلود",
                size: ButtonSize.MEDIUM,
                condition: Condition.DISABLED,
                iconView: new DownloadSvg(),
                type: ButtonType.CONTAINED
            })
            .setParent(this)
            .build(Button);
        this.v.buttons[8].moveIn(root);

        return root;
    }

    focusMove(target: Element, direction: [start: number, lenght: number]) {
        let simpleDirections = ExtractSimpleDirections(...direction);
        if (simpleDirections.length !== 1) {
            return;
        }
        let simpleDirection = simpleDirections[0];
        for (let i = 0; i < this.v.buttons.length; i++) {
            if (target === this.v.buttons[i].root) {
                switch (simpleDirection) {
                    case SimpleDirection.TOP:
                        this.v.buttons[(i === 0) ? this.v.buttons.length - 1 : i - 1].focusEnter([2, 1]);
                        return;
                    case SimpleDirection.BOTTOM:
                        this.v.buttons[(i === this.v.buttons.length - 1) ? 0 : i + 1].focusEnter([0, 1]);
                        return;
                }
            }
        }
    }
}

class Container2 extends View<null, null> {
    initState(): null {
        return null;
    }

    initVariables(): any {
        return {}
    }

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
                    target.setTitle("اجرای برنامه");
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
                    target.setCondition(ButtonCondition.ENABLED);
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
                    target.setCondition(ButtonCondition.DISABLED);
                }]
            })
            .setParent(this)
            .build(Button);
        conditionDisable.moveIn(containerDiv);

        let changeIcon = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "تغییر آیکون",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.SetIcon(new DownloadSvg());
                }]
            })
            .setParent(this)
            .build(Button);
        changeIcon.moveIn(containerDiv);

        let clearIcon = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "خالی کردن آیکون",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.SetIcon(null);
                }]
            })
            .setParent(this)
            .build(Button);
        clearIcon.moveIn(containerDiv);

        let sizeMedium = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "اندازه متوسط",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setSize(ButtonSize.MEDIUM);
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
                    target.setSize(ButtonSize.LARGE);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeLarge.moveIn(containerDiv);

        let typeText = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دکمه ساده",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setType(ButtonType.TEXT);
                }]
            })
            .setParent(this)
            .build(Button);
        typeText.moveIn(containerDiv);

        let typeOutlined = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دکمه با کادر",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setType(ButtonType.OUTLINED);
                }]
            })
            .setParent(this)
            .build(Button);
        typeOutlined.moveIn(containerDiv);

        let typeContained = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "دکمه پر",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setType(ButtonType.CONTAINED);
                }]
            })
            .setParent(this)
            .build(Button);
        typeContained.moveIn(containerDiv);

        let data: State;
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
        let target = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "اجرای برنامه",
            })
            .setParent(this)
            .build(Button);
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

let root = new EmptyView(null, null, null);
root.root.classList.add(BasisStyle["tct-root"]);
root.root.style.display = "flex";
document.body.appendChild(root.root);

FOCUS_MANAGER.init([root], root);

let container = new Container(null, null, root);
container.moveIn();

let container2 = new Container2(null, null, root);
container2.moveIn();