import {View} from "./View";
import {BaseView} from "./BaseView";

export abstract class ViewBuilder<Props, State, PartialProps, PartialState, Parent extends BaseView = BaseView, TargetView extends View<any, any, any, Parent> = View<any, any, any, Parent>> {
    private state: State | undefined;
    private props: Props | undefined;
    private parent: Parent | null | undefined;
    private lazyBuild: boolean | undefined;

    fillProps(partialProps: PartialProps): this {
        return this.setProps(this.fillPropsHelper(partialProps));
    }

    fillState(partialState: PartialState): this {
        return this.setState(this.fillStateHelper(partialState));
    }

    setProps(props: Props): this {
        this.props = props;
        return this;
    }

    setState(state: State): this {
        this.state = state;
        return this;
    }

    setParent(parent: Parent | null): this {
        this.parent = parent;
        return this;
    }

    setLazy(lazyBuild: boolean): this {
        this.lazyBuild = lazyBuild;
        return this;
    }

    build(constructor: new(props: Props, state: State, parent: Parent | null, lazyBuild: boolean) => TargetView): TargetView {
        if (typeof this.props === "undefined") {
            throw Error("props is not set!");
        }
        if (typeof this.state === "undefined") {
            throw Error("state is not set!");
        }
        if (typeof this.parent === "undefined") {
            this.parent = null;
        }
        if (typeof this.lazyBuild === "undefined") {
            this.lazyBuild = false;
        }
        return new constructor(this.props, this.state, this.parent, this.lazyBuild);
    }

    abstract fillPropsHelper(PartialProps: PartialProps): Props;

    abstract fillStateHelper(partialState: PartialState): State;
}