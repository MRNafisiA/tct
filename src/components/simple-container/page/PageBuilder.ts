import {View} from "../../../view/View";
import {ViewBuilder} from "../../../view/ViewBuilder";
import {Page, Props, State} from "./Page";
import {SimpleContainer} from "../SimpleContainer";

interface PartialProps {
    additionalClasses?: string[];
    id: string;
    header?: {
        title: string;
        onClick: () => void;
    } | null;
    content: View
}

interface PartialState {

}

export class PageBuilder
    extends ViewBuilder<Props, State, PartialProps, PartialState, SimpleContainer, Page> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? [],
            id: partialProps.id,
            header: partialProps.header ?? null,
            content: partialProps.content
        };
    }

    fillStateHelper(partialState: PartialState): State {
        return {};
    }
}