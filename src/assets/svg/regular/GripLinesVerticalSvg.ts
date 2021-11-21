import {BaseView} from "../../../view/BaseView";
import {Svg} from "../Svg";

export class GripLinesVerticalSvg<ParentView extends BaseView = BaseView>
    extends Svg<ParentView> {
    render(props: null): SVGSVGElement {
        let root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        root.setAttribute("width", "256");
        root.setAttribute("height", "512");
        root.setAttribute("viewBox", "0 0 256 512");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M96 464V48c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16v416c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16zm112 0V48c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v416c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16z");

        root.appendChild(path);

        return root;
    }
}