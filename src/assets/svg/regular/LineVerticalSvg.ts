import {BaseView} from "../../../view/BaseView";
import {Svg} from "../Svg";

export class LineVerticalSvg<ParentView extends BaseView = BaseView>
    extends Svg<ParentView> {
    render(props: null): SVGSVGElement {
        let root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        root.setAttribute("width", "70");
        root.setAttribute("height", "250");
        root.setAttribute("viewBox", "0 0 70 250");

        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width","14");
        rect.setAttribute("height","200");
        rect.setAttribute("x","28");
        rect.setAttribute("y","25");

        root.appendChild(rect);

        return root;
    }
}