import {BaseView} from "../../view/BaseView";
import {ViewBuilder} from "../../view/ViewBuilder";
import {RadioButton, Props, State} from "./RadioButton";
import {Size} from "./enums/Size";
import {Condition} from "./enums/Condition";
import {Status} from "./enums/Status";

interface PartialProps {
    additionalClasses?: string[];
}

interface PartialState {
    title?: string | null;
    status?: Status;
    size?: Size;
    condition?: Condition;
    onChanges?: ((oldStatus: Status, status: Status) => void)[];
    onClicks?: ((event: MouseEvent | KeyboardEvent) => void)[];
}

export class RadioButtonBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, RadioButton<ParentView>> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? []
        };
    }

    fillStateHelper(partialState: PartialState): State {
        return {
            title: partialState.title ?? null,
            status: partialState.status ?? Status.UNCHECKED,
            size: partialState.size ?? Size.MEDIUM,
            condition: partialState.condition ?? Condition.ENABLED,
            onChanges: partialState.onChanges ?? [],
            onClicks: partialState.onClicks ?? []
        };
    }
}