import {View} from "../view/View";
import {FOCUS_MANAGER} from "../view/FocusManager";
import {SimpleContainer} from "../components/simple-container/SimpleContainer";
import {SimpleContainerBuilder} from "../components/simple-container/SimpleContainerBuilder";
import {BaseView} from "../view/BaseView";
import {AnimationType} from "../components/container/enums/AnimationType";
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

        this.v.simpleContainer = new SimpleContainerBuilder()
            .fillProps({animationType: AnimationType.SLIDE})
            .fillState({
                measurements: {
                    width: 15,
                    height: 25
                }
            })
            .setParent(this)
            .build(SimpleContainer);
        this.v.simpleContainer.moveIn(root);

        let number = 0;
        let page1 = new Page({color: 1}, null);
        let page2 = new Page({color: 2}, null);
        let page3 = new Page({color: 3}, null);

        let button1 = document.createElement("button");
        button1.innerText = "page 1";
        button1.onclick = () => {
            this.v.simpleContainer.add((++number).toString(), "page-1", page1);
        }

        let button2 = document.createElement("button");
        button2.innerText = "page 2";
        button2.onclick = () => {
            this.v.simpleContainer.add((++number).toString(), "page-2", page2);
        }

        let button3 = document.createElement("button");
        button3.innerText = "page 3";
        button3.onclick = () => {
            this.v.simpleContainer.add((++number).toString(), "page-3", page3);
        }

        let button4 = document.createElement("button");
        button4.innerText = "back";
        button4.onclick = () => {
            this.v.simpleContainer.back();
        }

        root.appendChild(button1);
        root.appendChild(button2);
        root.appendChild(button3);
        root.appendChild(button4);

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

class Page extends View<{ color: number }, null> {
    initState(): null {
        return null;
    }

    initVariables(): any {
    }

    render(props: { color: number }): HTMLDivElement {
        let root = document.createElement("div");

        root.style.width = "100%";
        root.style.height = "100%";
        root.style.color = "white";
        root.style.borderRadius = "10px";
        root.style.padding = "1rem";
        root.innerText = Math.random().toString();
        switch (this.props.color) {
            case 1:
                root.style.background = "red";
                break;
            case 2:
                root.style.background = "blue";
                break;
            case 3:
                root.style.background = "black";
                break;
        }

        return root;
    }
}

let root = new EmptyView(null, null);
root.root.classList.add(BasisStyle["tct-root"]);
root.root.style.display = "flex";
document.body.appendChild(root.root);

FOCUS_MANAGER.init([root], root);

let container = new Container(null, null, root);
container.moveIn();