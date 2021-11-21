import {View} from "../view/View";
import {BaseView} from "../view/BaseView";
import {FOCUS_MANAGER} from "../view/FocusManager";
import {TooltipBuilder} from "../components/tooltip/TooltipBuilder";
import {ButtonBuilder} from "../components/button/ButtonBuilder";
import {Button} from "../components/button/Button";
import {Type as ButtonType} from "../components/button/enums/Type";
import {Tooltip} from "../components/tooltip/Tooltip";
import {Direction as TooltipDirection} from "../components/base-tooltip/enums/Direction";
import {Align as TooltipAlign} from "../components/base-tooltip/enums/Align";
import BasisStyle from "../assets/basis.style.css";

class Container extends View<null, null> {
    initVariables(): any {
        return {};
    }

    initState(): null {
        return null;
    }

    render(props: null): Element {
        let root = document.createElement("div");
        root.classList.add("container-1");

        let tooltip1 = new TooltipBuilder()
            .fillProps({})
            .fillState({
                target: new ButtonBuilder()
                    .fillProps({})
                    .fillState({
                        type: ButtonType.CONTAINED,
                        title: "اجرا"
                    })
                    .build(Button),
                content: new ButtonBuilder()
                    .fillProps({})
                    .fillState({
                        title: "اجرا"
                    })
                    .build(Button),
                // hasArrow: false,
                hasArrow: true,
                mode: {
                    autoPosition: true,
                    preferred: [{
                        direction: TooltipDirection.BOTTOM,
                        align: TooltipAlign.CENTER
                    }],
                },
                showOnHover: true
            })
            .setParent(this)
            .build(Tooltip);
        this.v.tooltip1 = tooltip1;
        this.v.tooltip1.moveIn(root);

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