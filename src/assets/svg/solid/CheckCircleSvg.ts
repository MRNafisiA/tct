import {BaseView} from "../../../view/BaseView";
import {Svg} from "../Svg";

export class CheckCircleSvg<ParentView extends BaseView = BaseView>
    extends Svg<ParentView> {
    render(props: null): SVGSVGElement {
        let root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        root.setAttribute("width", "496");
        root.setAttribute("height", "496");
        root.setAttribute("viewBox", "0 0 496 496");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("transform", "translate(-8,-8)");
        path.setAttribute("d", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z");

        root.appendChild(path);

        return root;
    }
}