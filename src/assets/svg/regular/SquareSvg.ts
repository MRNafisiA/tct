import {BaseView} from "../../../view/BaseView";
import {Svg} from "../Svg";

export class SquareSvg<ParentView extends BaseView = BaseView>
    extends Svg<ParentView> {
    render(props: null): SVGSVGElement {
        let root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        root.setAttribute("width", "448");
        root.setAttribute("height", "448");
        root.setAttribute("viewBox", "0 0 448 448");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("transform", "translate(0,-32)");
        path.setAttribute("d", "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z");

        root.appendChild(path);

        return root;
    }
}