import {View} from "../../view/View";
import {BaseView} from "../../view/BaseView";

export abstract class Svg<ParentView extends BaseView = BaseView> extends View<null, null, null, ParentView, SVGSVGElement> {
    constructor(parent: ParentView | null = null, lazyBuild: boolean = false) {
        super(null, null, parent, lazyBuild);
    }

    initState(): null {
        return null;
    }

    initVariables(): null {
        return null;
    }
}