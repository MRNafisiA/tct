import {BaseView} from "../../../view/BaseView";
import {Svg} from "../Svg";

export class CircleSvg<ParentView extends BaseView = BaseView>
    extends Svg<ParentView> {
    render(props: null): SVGSVGElement {
        let root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        root.setAttribute("width", "496");
        root.setAttribute("height", "496");
        root.setAttribute("viewBox", "0 0 496 496");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("transform", "translate(-8,-8)");
        path.setAttribute("d", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z");

        root.appendChild(path);

        return root;
    }
}