import {View} from "../../view/View";
import {Props, State} from "../base-tooltip/BaseTooltip";
import {BaseView} from "../../view/BaseView";
import {ViewBuilder} from "../../view/ViewBuilder";
import {Tooltip} from "./Tooltip";
import {Direction} from "../base-tooltip/enums/Direction";
import {Align} from "../base-tooltip/enums/Align";
import {Position} from "../base-tooltip/types/Position";
import {Mode} from "../base-tooltip/types/Mode";

type PartialMode = {
    autoPosition: true;
    widthThreshold?: number;
    heightThreshold?: number;
    preferred?: Position[];
    forbidden?: Position[];
} | {
    autoPosition: false;
    position?: Position;
};

export interface PartialProps {
    additionalClasses?: string[];
}

export interface PartialState {
    content: View;
    target: View;
    mode?: PartialMode;
    showOnHover?: boolean;
    hasArrow?: boolean;
}

export class TooltipBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, Tooltip<ParentView>> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? []
        };
    }

    fillStateHelper(partialState: PartialState): State {
        let resultMode: Mode;
        if (typeof partialState.mode === "undefined") {
            resultMode = {
                autoPosition: true,
                widthThreshold: 15,
                heightThreshold: 6,
                preferred: [],
                forbidden: []
            };
        } else if (partialState.mode.autoPosition) {
            resultMode = {
                autoPosition: true,
                widthThreshold: partialState.mode.widthThreshold ?? 15,
                heightThreshold: partialState.mode.heightThreshold ?? 6,
                preferred: partialState.mode.preferred ?? [],
                forbidden: partialState.mode.forbidden ?? []
            };
        } else {
            resultMode = {
                autoPosition: false,
                position: partialState.mode.position ?? {
                    direction: Direction.TOP,
                    align: Align.CENTER
                }
            };
        }
        return {
            content: partialState.content,
            target: partialState.target,
            mode: resultMode,
            showOnHover: partialState.showOnHover ?? true,
            hasArrow: partialState.hasArrow ?? true
        };
    }
}