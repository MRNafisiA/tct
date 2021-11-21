import {Container, Props, State} from "./Container";
import {View} from "../../view/View";
import {BaseView} from "../../view/BaseView";
import {ViewBuilder} from "../../view/ViewBuilder";
import {AnimationType} from "./enums/AnimationType";

interface PartialProps {
    additionalClasses?: string[];
    animationType?: AnimationType;
}

interface PartialState {
    width?: number | null;
    height?: number | null;
    view?: View<Container> | null
}

export class ContainerBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, Container<ParentView>> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? [],
            animationType: partialProps.animationType ?? AnimationType.NA
        };
    }

    fillStateHelper(partialState: PartialState): State {
        return {
            width: partialState.width ?? null,
            height: partialState.height ?? null,
            view: partialState.view ?? null
        };
    }
}