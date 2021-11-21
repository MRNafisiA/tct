import {Field, Props, State} from "./Field";
import {BaseView} from "../../view/BaseView";
import {Status} from "./enums/Status";
import {Condition} from "./enums/Condition";
import {Size} from "./enums/Size";
import {Filter} from "./enums/Filter";
import {Type} from "./enums/Type";
import {ViewBuilder} from "../../view/ViewBuilder";
import {Item} from "./types/Item";
import {Message} from "./types/Message";
import {StatusUpdater} from "./types/StatusUpdater";
import {MessageUpdater} from "./types/MessageUpdater";

interface PartialProps {
    additionalClasses?: string[];
    type?: Type;
    lazyStatusUpdater?: boolean;
    lazyMessageUpdater?: boolean;
}

interface PartialState {
    title: string;
    value?: string;
    items?: Item[];
    message?: Message | null;
    placeholder?: string;
    filters?: Filter[];
    size?: Size;
    status?: Status;
    condition?: Condition;
    onChanges?: ((value: string) => void)[];
    onClicks?: ((event: MouseEvent) => void)[];
    onKeyUps?: ((event: KeyboardEvent) => void)[];
    statusUpdater?: StatusUpdater | null;
    messageUpdater?: MessageUpdater | null;
}

export class FieldBuilder<ParentView extends BaseView = BaseView>
    extends ViewBuilder<Props, State, PartialProps, PartialState, ParentView, Field<ParentView>> {
    fillPropsHelper(partialProps: PartialProps): Props {
        return {
            additionalClasses: partialProps.additionalClasses ?? [],
            type: partialProps.type ?? Type.TEXT,
            lazyStatusUpdater: partialProps.lazyStatusUpdater ?? true,
            lazyMessageUpdater: partialProps.lazyMessageUpdater ?? true
        };
    }

    fillStateHelper(partialState: PartialState): State {
        return {
            title: partialState.title,
            value: partialState.value ?? "",
            items: partialState.items ?? [],
            message: partialState.message ?? null,
            placeholder: partialState.placeholder ?? "",
            filters: partialState.filters ?? [],
            size: partialState.size ?? Size.MEDIUM,
            status: partialState.status ?? Status.DEFAULT,
            condition: partialState.condition ?? Condition.ENABLED,
            onChanges: partialState.onChanges ?? [],
            onClicks: partialState.onClicks ?? [],
            onKeyUps: partialState.onKeyUps ?? [],
            statusUpdater: partialState.statusUpdater ?? null,
            messageUpdater: partialState.messageUpdater ?? null
        };
    }
}