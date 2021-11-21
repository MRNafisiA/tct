import {View} from "../../../view/View";
import PageStyle from "./Page.style.css";
import BasisStyle from "../../../assets/basis.style.css";
import {ArrowRightSvg} from "../../../assets/svg/regular/ArrowRightSvg";
import {SimpleContainer} from "../SimpleContainer";

export interface Props {
    additionalClasses: string[];
    id: string;
    header: {
        title: string;
        onClick: () => void;
    } | null;
    content: View
}

export interface State {

}

export interface Variables {

}

export class Page extends View<Props, State, Variables, SimpleContainer, HTMLDivElement> {
    initState(): State {
        return {};
    }

    initVariables(): Variables {
        return {};
    }

    render(props: Props): HTMLDivElement {
        let root = document.createElement("div");
        root.classList.add(BasisStyle["tct"], PageStyle["page"], ...props.additionalClasses);

        // header
        if (props.header !== null) {
            let headerDiv = document.createElement("div");
            headerDiv.classList.add(PageStyle["header"]);

            let headerContainerDiv = document.createElement("div");
            headerContainerDiv.addEventListener("click", props.header.onClick);

            // back icon
            let backIconDiv = document.createElement("div");
            new ArrowRightSvg(this).moveIn(backIconDiv);

            // title
            let titleSpan = document.createElement("span");
            titleSpan.innerText = props.header.title;

            headerContainerDiv.appendChild(backIconDiv);
            headerContainerDiv.appendChild(titleSpan);

            headerDiv.appendChild(headerContainerDiv);

            root.appendChild(headerDiv);
        }

        // body
        let body = document.createElement("div");
        body.classList.add(PageStyle["body"]);
        props.content.parent = this;
        props.content.moveIn(body);

        root.appendChild(body);

        return root;
    }
}