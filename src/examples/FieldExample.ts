import {View} from "../view/View";
import {BaseView} from "../view/BaseView";
import {ExtractSimpleDirections, FOCUS_MANAGER, SimpleDirection} from "../view/FocusManager";
import {Field} from "../components/field/Field";
import {FieldBuilder} from "../components/field/FieldBuilder";
import {Condition, Condition as FieldCondition} from "../components/field/enums/Condition";
import {Filter as FieldFilter} from "../components/field/enums/Filter";
import {Type as FieldType} from "../components/field/enums/Type";
import {Size as FieldSize} from "../components/field/enums/Size";
import {Status, Status as FieldStatus} from "../components/field/enums/Status";
import {Button} from "../components/button/Button";
import {ButtonBuilder} from "../components/button/ButtonBuilder";
import {Type as ButtonType} from "../components/button/enums/Type";
import {DownloadSvg} from "../assets/svg/solid/DownloadSvg";
import {Message} from "../components/field/types/Message";
import BasisStyle from "../assets/basis.style.css";

class Container extends View<null, null> {
    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-1");

        let descriptionSpan = document.createElement("span");
        descriptionSpan.innerText = "Focus Flow (use alt + arrows):";
        root.appendChild(descriptionSpan);

        this.v.fields = [];
        this.v.fields[0] = new FieldBuilder()
            .fillProps({
                type: FieldType.TEXT,
                lazyStatusUpdater: false,
                lazyMessageUpdater: false
            })
            .fillState({
                title: "توضیحات",
                placeholder: "مثلا سند مربط به فروش ...",
                value: " مقدار اولیه",
                status: FieldStatus.VALID,
                condition: FieldCondition.ENABLED,
                size: FieldSize.MEDIUM,
                filters: [FieldFilter.ENGLISH_NUMBER_ONLY],
                onChanges: [(value) => {
                    console.log("value is: " + value);
                }],
                statusUpdater: () => {
                },
                messageUpdater: () => {
                },
            })
            .setParent(this)
            .build(Field);
        this.v.fields[0].moveIn(root);

        this.v.fields[1] = new FieldBuilder()
            .fillProps({
                type: FieldType.EMAIL
            })
            .fillState({
                title: "توضیحات",
                status: Status.DEFAULT,
                message: {
                    text: "اطلاعات با موفقیت وارد شد.",
                    icon: new DownloadSvg()
                }
            })
            .setParent(this)
            .build(Field);
        this.v.fields[1].moveIn(root);

        this.v.fields[2] = new FieldBuilder()
            .fillProps({
                type: FieldType.DATE
            })
            .fillState({
                title: "توضیحات",
                placeholder: "متن نمونه"
            })
            .setParent(this)
            .build(Field);
        this.v.fields[2].moveIn(root);

        this.v.fields[3] = new FieldBuilder()
            .fillProps({
                type: FieldType.TEXT_AREA
            })
            .fillState({
                condition: FieldCondition.ENABLED,
                size: FieldSize.LARGE,
                placeholder: "متن نمونه",
                title: "توضیحات"
            })
            .setParent(this)
            .build(Field);
        this.v.fields[3].moveIn(root);

        this.v.fields[4] = new FieldBuilder()
            .fillProps({
                type: FieldType.NUMBER
            })
            .fillState({
                condition: FieldCondition.ENABLED,
                size: FieldSize.LARGE,
                placeholder: "متن نمونه",
                title: "توضیحات"
            })
            .setParent(this)
            .build(Field);
        this.v.fields[4].moveIn(root);

        return root;
    }

    focusMove(target: HTMLElement, direction: [start: number, lenght: number]) {
        let simpleDirections = ExtractSimpleDirections(...direction);
        if (simpleDirections.length !== 1) {
            return;
        }
        let simpleDirection = simpleDirections[0];
        for (let i = 0; i < this.v.fields.length; i++) {
            if (target === this.v.fields[i].root) {
                switch (simpleDirection) {
                    case SimpleDirection.TOP:
                        this.v.fields[(i === 0) ? this.v.fields.length - 1 : i - 1].focusEnter([2, 1]);
                        return;
                    case SimpleDirection.BOTTOM:
                        this.v.fields[(i === this.v.fields.length - 1) ? 0 : i + 1].focusEnter([0, 1]);
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

        let sizeSmall = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "سایز کوچک",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setSize(FieldSize.SMALL);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeSmall.moveIn(containerDiv);

        let sizeMedium = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "سایز متوسط",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setSize(FieldSize.MEDIUM);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeMedium.moveIn(containerDiv);

        let sizeLarge = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "سایز بزرگ",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setSize(FieldSize.LARGE);
                }]
            })
            .setParent(this)
            .build(Button);
        sizeLarge.moveIn(containerDiv);

        let conditionEnable = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "فعال کردن",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setCondition(FieldCondition.ENABLED);
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
                    target.setCondition(FieldCondition.DISABLED);
                }]
            })
            .setParent(this)
            .build(Button);
        conditionDisable.moveIn(containerDiv);

        let changeValue = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "تغییر مقدار",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setValue("محمد رضا نفیسی");
                }]
            })
            .setParent(this)
            .build(Button);
        changeValue.moveIn(containerDiv);

        let clearValue = new ButtonBuilder()
            .fillProps({})
            .fillState({
                title: "خالی کردن مقدار",
                type: ButtonType.TEXT,
                onClicks: [() => {
                    target.setValue("");
                }]
            })
            .setParent(this)
            .build(Button);
        clearValue.moveIn(containerDiv);

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
        let target = new FieldBuilder()
            .fillProps({})
            .fillState({
                // condition: Condition.DISABLED,
                title: "نام و نام خانوادگی",
                items: [
                    {
                        id: "1",
                        value: "بهنام خدمتی زارع",
                        locked: false,
                        data: {}
                    },
                    {
                        id: "2",
                        value: "رضا منصوری",
                        locked: false,
                        data: {}
                    },
                    {
                        id: "3",
                        value: "محمد شریفی",
                        locked: true,
                        data: {}
                    }
                ],
                placeholder: "مثلا علی علوی ...",
                onKeyUps: [(event) => {
                    if (event.key === "Enter") {
                        if (target.state.value.length % 2 === 0) {
                            target.addItem({
                                id: Math.random().toString(),
                                value: target.state.value,
                                locked: false,
                                data: {}
                            });
                            target.setValue("");
                        }
                    }
                }],
                statusUpdater: (value: string, callback: (status: Status, id: number) => void, id: number) => {
                    setTimeout(() => {
                        callback((value.length % 2 === 0) ? Status.VALID : Status.INVALID, id);
                    }, 2000);
                },
                messageUpdater: (value: string, callback: (message: Message, id: number) => void, id: number) => {
                    setTimeout(() => {
                        callback({
                            text: Math.random().toString(),
                            icon: new DownloadSvg()
                        }, id);
                    }, 2000);
                }
            })
            .setParent(this)
            .build(Field);
        target.moveIn(containerDiv2);

        root.appendChild(containerDiv);
        root.appendChild(containerDiv2);

        return root;
    }

    initState(): null {
        return null;
    }

    initVariables(): any {
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