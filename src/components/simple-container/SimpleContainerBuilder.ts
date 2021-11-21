import {BaseView} from "../../view/BaseView";
import {Props, SimpleContainer, State} from "./SimpleContainer";
import {ViewBuilder} from "../../view/ViewBuilder";
import {AnimationType} from "../container/enums/AnimationType";
import {Page} from "./page/Page";
import {Measurements} from "./types/Measurements";

interface PartialProps {
    additionalClasses?: string[];
    animationType?: AnimationType;
}

interface PartialState {
    measurements?: Measurements
    currentPage?: Page | null;
    pagesStack?: Page[];
}

export class SimpleContainerBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, SimpleContainer<ParentView>> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? [],
            animationType: partialProps.animationType ?? AnimationType.NA
        };
    }

    fillStateHelper(partialState: PartialState): State {
        return {
            measurements: partialState.measurements ?? {width: null, height: null},
            currentPage: null,
            pagesStack: []
        };
    }
}