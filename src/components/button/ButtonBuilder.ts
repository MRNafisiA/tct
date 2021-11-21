import {Button, Props, State} from "./Button";
import {View} from "../../view/View";
import {BaseView} from "../../view/BaseView";
import {ViewBuilder} from "../../view/ViewBuilder";
import {Condition} from "./enums/Condition";
import {Size} from "./enums/Size";
import {Type} from "./enums/Type";

interface PartialProps {
    additionalClasses?: string[];
}

interface PartialState {
    title?: string | null;
    iconView?: View<any, any, any, Button> | null;
    condition?: Condition;
    size?: Size;
    type?: Type;
    onClicks?: ((event: MouseEvent) => void)[];
}

export class ButtonBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, Button<ParentView>> {
    fillPropsHelper(partialBuildData: PartialProps): Props {
        return {
            additionalClasses: partialBuildData.additionalClasses ?? []
        };
    }

    fillStateHelper(partialFormData: PartialState): State {
        return {
            title: partialFormData.title ?? null,
            condition: partialFormData.condition ?? Condition.ENABLED,
            iconView: partialFormData.iconView ?? null,
            size: partialFormData.size ?? Size.MEDIUM,
            type: partialFormData.type ?? Type.TEXT,
            onClicks: partialFormData.onClicks ?? []
        };
    }
}