import {View} from "../../view/View";
import {Container} from "../container/Container";
import BasisStyle from "../../assets/basis.style.css";
import SimpleContainerStyle from "./SimpleContainer.style.css";
import {BaseView} from "../../view/BaseView";
import {ContainerBuilder} from "../container/ContainerBuilder";
import {AnimationType} from "../container/enums/AnimationType";
import {Page} from "./page/Page";
import {PageBuilder} from "./page/PageBuilder";
import {Measurements} from "./types/Measurements";

export interface Props {
    additionalClasses: string[];
    animationType: AnimationType;
}

export interface State {
    measurements: Measurements
    currentPage: Page | null;
    pagesStack: Page[];
}

export interface Variables {
    container: Container<SimpleContainer>;
}

export class SimpleContainer<ParentView extends BaseView = BaseView>
    extends View<Props, State, Variables, ParentView, HTMLDivElement> {
    // abstract implementation
    initState(): State {
        return {
            measurements: {
                width: null,
                height: null,
            },
            currentPage: null,
            pagesStack: []
        };
    }

    initVariables(): Variables {
        return {
            container: new ContainerBuilder<SimpleContainer>()
                .fillProps({animationType: this.props.animationType})
                .fillState({})
                .setParent(this)
                .build(Container)
        };
    }

    render(props: Props): HTMLDivElement {
        let root = document.createElement("div");
        root.classList.add(BasisStyle["tct"], SimpleContainerStyle["simple-container"], ...props.additionalClasses);

        this.v.container.moveIn(root);

        return root;
    }

    // custom overrides
    setState(nextState: State) {
        // measurements
        this.setMeasurements(nextState.measurements);

        // currentPage
        this.setCurrentPage(nextState.currentPage);

        // pagesStack
        this.setPagesStack(nextState.pagesStack);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        if (this.state.currentPage !== null) {
            this.state.currentPage.props.content.focusEnter(direction);
        }
    }

    // view interface
    setMeasurements(measurements: Measurements): void {
        if (measurements.width !== null) {
            this.root.style.width = measurements.width.toString() + "rem";
        } else if (this.state.measurements.width !== null) {
            this.root.style.removeProperty("width");
        }
        if (measurements.height !== null) {
            this.root.style.height = measurements.height.toString() + "rem";
        } else if (this.state.measurements.height !== null) {
            this.root.style.removeProperty("height");
        }
        this.state.measurements = measurements;
    }

    setCurrentPage(currentPage: Page | null): void {
        this.v.container.setView(currentPage, true);
        this.state.currentPage = currentPage;
    }

    setPagesStack(pagesStack: Page[]): void {
        this.state.pagesStack = pagesStack;
    }

    add(id: string, title: string, content: View): void {
        if (this.state.currentPage !== null) {
            this.state.pagesStack.push(this.state.currentPage);
        }
        this.state.currentPage = new PageBuilder()
            .fillProps({
                id: id,
                content: content,
                header: (this.state.pagesStack.length === 0) ? null : {
                    title: title,
                    onClick: () => this.back()
                }
            })
            .fillState({})
            .setParent(this)
            .build(Page);
        this.v.container.setView(this.state.currentPage);
    }

    back(): void {
        if (this.state.pagesStack.length === 0) {
            return;
        }
        let page = this.state.pagesStack.pop()!;
        this.v.container.setView(page, false);
        this.state.currentPage = page;
    }

    backTo(id: string): void {
        while (this.state.pagesStack.length !== 0 && this.state.pagesStack[this.state.pagesStack.length - 1].props.id !== id) {
            this.state.pagesStack.pop();
        }
        this.back();
    }
}