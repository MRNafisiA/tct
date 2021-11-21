import {Props, State, Toggle} from "./Toggle";
import {BaseView} from "../../view/BaseView";
import {ViewBuilder} from "../../view/ViewBuilder";
import {Status} from "./enums/Status";
import {Size} from "./enums/Size";
import {Condition} from "./enums/Condition";
import {Shape} from "./enums/Shape";

interface PartialProps {
    additionalClasses?: string[];
}

interface PartialState {
    status?: Status;
    size?: Size;
    condition?: Condition;
    shape?: Shape;
    onChanges?: ((state: State) => void)[];
}

export class ToggleBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, Toggle<ParentView>> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? []
        };
    }

    fillStateHelper(partialState: PartialState): State {
        return {
            status: partialState.status ?? Status.UNCHECKED,
            size: partialState.size ?? Size.MEDIUM,
            condition: partialState.condition ?? Condition.ENABLED,
            shape: partialState.shape ?? Shape.CIRCLE,
            onChanges: partialState.onChanges ?? []
        };
    }
}