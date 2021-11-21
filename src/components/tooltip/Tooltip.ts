import {BaseView} from "../../view/BaseView";
import {BaseTooltip, State, Variables} from "../base-tooltip/BaseTooltip";

export class Tooltip<ParentView extends BaseView = BaseView> extends BaseTooltip<ParentView> {
    initVariables(): Variables {
        return this.initBaseVariables();
    }

    initState(): State {
        return this.initBaseState();
    }
}