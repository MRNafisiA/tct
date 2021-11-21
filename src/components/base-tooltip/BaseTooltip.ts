import {View} from "../../view/View";
import BasisStyle from "../../assets/basis.style.css";
import BaseTooltipStyle from "./BaseTooltip.style.css";
import {Direction} from "./enums/Direction";
import {Align} from "./enums/Align";
import {BaseView, ExtendableState, ExtendableVariables} from "../../view/BaseView";
import {Mode} from "./types/Mode";
import {Position} from "./types/Position";

export interface Props {
    additionalClasses: string[];
}

export interface State {
    content: View | null;
    target: View | null;
    mode: Mode;
    showOnHover: boolean;
    hasArrow: boolean;
}

export interface Variables {
    showing: boolean;
    position: Position;
    autoPositionEnterEvent: EventListener;
    autoPositionLeaveEvent: EventListener;
    targetDiv: HTMLDivElement;
    contentDiv: HTMLDivElement;
    contentContainerDiv: HTMLDivElement;
}

export abstract class BaseTooltip<ParentView extends BaseView = BaseView, ExtendedProps extends Props = Props, ExtendedState extends State = State, ExtendedVariables extends Variables = Variables>
    extends View<ExtendedProps, ExtendedState, ExtendedVariables, ParentView, HTMLDivElement>
    implements ExtendableState<State>, ExtendableVariables<Variables> {
    // abstract implementation
    render(props: ExtendedProps): HTMLDivElement {
        let root = document.createElement("div");
        root.classList.add(BasisStyle["tct"], BaseTooltipStyle["base-tooltip"], ...props.additionalClasses);

        // contentDiv
        this.v.contentDiv.classList.add(BaseTooltipStyle["content"]);

        // targetDiv
        this.v.targetDiv.classList.add(BaseTooltipStyle["target"]);

        // hoverHelper
        let hoverHelperDiv = document.createElement("div");
        hoverHelperDiv.classList.add(BaseTooltipStyle["hover-helper"]);

        // append
        this.v.contentDiv.appendChild(this.v.contentContainerDiv);
        root.appendChild(this.v.targetDiv);
        root.appendChild(hoverHelperDiv);
        root.appendChild(this.v.contentDiv);

        return root;
    }

    // interface implementation
    initBaseState(): State {
        return {
            content: null,
            target: null,
            mode: {
                autoPosition: true,
                widthThreshold: 0,
                heightThreshold: 0,
                preferred: [],
                forbidden: []
            },
            showOnHover: false,
            hasArrow: false
        };
    }

    initBaseVariables(): Variables {
        return {
            showing: false,
            position: {
                direction: <Direction><unknown>null,
                align: <Align><unknown>null
            },
            autoPositionEnterEvent: () => {
                if (this.state.mode.autoPosition) {
                    this.rePosition();
                }
                this.v.showing = true;
            },
            autoPositionLeaveEvent: () => {
                this.v.showing = false;
            },
            targetDiv: document.createElement("div"),
            contentDiv: document.createElement("div"),
            contentContainerDiv: document.createElement("div")
        };
    }

    // custom overrides
    setState(nextState: ExtendedState) {
        // target
        this.setTarget(nextState.target);

        // content
        this.setContent(nextState.content);

        // mode
        this.setMode(nextState.mode);

        // showOnHover
        this.setShowOnHover(nextState.showOnHover);

        // hasArrow
        this.setHasArrow(nextState.hasArrow);
    }

    focusEnter(direction: [start: number, lenght: number]): void {
        this.state.target?.focusEnter(direction);
    }

    focusMove(target: HTMLElement, direction: [start: number, lenght: number]): void {
        // if (target === this.f.tooltipTarget.vision && this.v.showing) {
        //     if (this.v.position.direction === TooltipDirection.TOP) {
        //         if ([
        //             FocusDirection.TOP_LEFT,
        //             FocusDirection.TOP_2,
        //             FocusDirection.TOP_3,
        //             FocusDirection.TOP_4,
        //             FocusDirection.TOP_CENTER,
        //             FocusDirection.TOP_6,
        //             FocusDirection.TOP_7,
        //             FocusDirection.TOP_8,
        //             FocusDirection.TOP_RIGHT
        //         ].includes(direction)) {
        //             this.f.tooltipContent.focusEnter(FocusDirection.BOTTOM_CENTER);
        //         }
        //     } else if (this.v.position.direction === TooltipDirection.RIGHT) {
        //         if ([
        //             FocusDirection.RIGHT_TOP,
        //             FocusDirection.RIGHT_2,
        //             FocusDirection.RIGHT_3,
        //             FocusDirection.RIGHT_4,
        //             FocusDirection.RIGHT_CENTER,
        //             FocusDirection.RIGHT_6,
        //             FocusDirection.RIGHT_7,
        //             FocusDirection.RIGHT_8,
        //             FocusDirection.RIGHT_BOTTOM
        //         ].includes(direction)) {
        //             this.f.tooltipContent.focusEnter(FocusDirection.LEFT_CENTER);
        //         }
        //     } else if (this.v.position.direction === TooltipDirection.BOTTOM) {
        //         if ([
        //             FocusDirection.BOTTOM_RIGHT,
        //             FocusDirection.BOTTOM_2,
        //             FocusDirection.BOTTOM_3,
        //             FocusDirection.BOTTOM_4,
        //             FocusDirection.BOTTOM_CENTER,
        //             FocusDirection.BOTTOM_6,
        //             FocusDirection.BOTTOM_7,
        //             FocusDirection.BOTTOM_8,
        //             FocusDirection.BOTTOM_LEFT
        //         ].includes(direction)) {
        //             this.f.tooltipContent.focusEnter(FocusDirection.TOP_CENTER);
        //         }
        //     } else if (this.v.position.direction === TooltipDirection.LEFT) {
        //         if ([
        //             FocusDirection.LEFT_BOTTOM,
        //             FocusDirection.LEFT_2,
        //             FocusDirection.LEFT_3,
        //             FocusDirection.LEFT_4,
        //             FocusDirection.LEFT_CENTER,
        //             FocusDirection.LEFT_6,
        //             FocusDirection.LEFT_7,
        //             FocusDirection.LEFT_8,
        //             FocusDirection.LEFT_TOP
        //         ].includes(direction)) {
        //             this.f.tooltipContent.focusEnter(FocusDirection.RIGHT_CENTER);
        //         }
        //     }
        // } else if (target === this.f.tooltipContent.vision && this.v.showing) {
        //     if (this.v.position.direction === TooltipDirection.TOP) {
        //         if ([
        //             FocusDirection.BOTTOM_RIGHT,
        //             FocusDirection.BOTTOM_2,
        //             FocusDirection.BOTTOM_3,
        //             FocusDirection.BOTTOM_4,
        //             FocusDirection.BOTTOM_CENTER,
        //             FocusDirection.BOTTOM_6,
        //             FocusDirection.BOTTOM_7,
        //             FocusDirection.BOTTOM_8,
        //             FocusDirection.BOTTOM_LEFT
        //         ].includes(direction)) {
        //             if (this.v.position.align === TooltipAlign.START) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.TOP_RIGHT);
        //             } else if (this.v.position.align === TooltipAlign.CENTER) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.TOP_CENTER);
        //             } else if (this.v.position.align === TooltipAlign.END) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.TOP_LEFT);
        //             }
        //         }
        //     } else if (this.v.position.direction === TooltipDirection.RIGHT) {
        //         if ([
        //             FocusDirection.LEFT_BOTTOM,
        //             FocusDirection.LEFT_2,
        //             FocusDirection.LEFT_3,
        //             FocusDirection.LEFT_4,
        //             FocusDirection.LEFT_CENTER,
        //             FocusDirection.LEFT_6,
        //             FocusDirection.LEFT_7,
        //             FocusDirection.LEFT_8,
        //             FocusDirection.LEFT_TOP
        //         ].includes(direction)) {
        //             if (this.v.position.align === TooltipAlign.START) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.LEFT_TOP);
        //             } else if (this.v.position.align === TooltipAlign.CENTER) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.LEFT_CENTER);
        //             } else if (this.v.position.align === TooltipAlign.END) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.LEFT_BOTTOM);
        //             }
        //         }
        //     } else if (this.v.position.direction === TooltipDirection.BOTTOM) {
        //         if ([
        //             FocusDirection.TOP_LEFT,
        //             FocusDirection.TOP_2,
        //             FocusDirection.TOP_3,
        //             FocusDirection.TOP_4,
        //             FocusDirection.TOP_CENTER,
        //             FocusDirection.TOP_6,
        //             FocusDirection.TOP_7,
        //             FocusDirection.TOP_8,
        //             FocusDirection.TOP_RIGHT
        //         ].includes(direction)) {
        //             if (this.v.position.align === TooltipAlign.START) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.BOTTOM_RIGHT);
        //             } else if (this.v.position.align === TooltipAlign.CENTER) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.BOTTOM_CENTER);
        //             } else if (this.v.position.align === TooltipAlign.END) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.BOTTOM_LEFT);
        //             }
        //         }
        //     } else if (this.v.position.direction === TooltipDirection.LEFT) {
        //         if ([
        //             FocusDirection.RIGHT_TOP,
        //             FocusDirection.RIGHT_2,
        //             FocusDirection.RIGHT_3,
        //             FocusDirection.RIGHT_4,
        //             FocusDirection.RIGHT_CENTER,
        //             FocusDirection.RIGHT_6,
        //             FocusDirection.RIGHT_7,
        //             FocusDirection.RIGHT_8,
        //             FocusDirection.RIGHT_BOTTOM
        //         ].includes(direction)) {
        //             if (this.v.position.align === TooltipAlign.START) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.RIGHT_TOP);
        //             } else if (this.v.position.align === TooltipAlign.CENTER) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.RIGHT_CENTER);
        //             } else if (this.v.position.align === TooltipAlign.END) {
        //                 this.f.tooltipTarget.focusEnter(FocusDirection.RIGHT_BOTTOM);
        //             }
        //         }
        //     }
        // } else {
        //     super.focusMove(this.vision, direction);
        // }
    }

    // private utils
    private rePosition(): void {
        if (!this.state.mode.autoPosition) {
            return;
        }

        // find possible positions
        let possiblePositions: Position[] = [];
        let targetDomRect = this.v.targetDiv.getBoundingClientRect();
        let remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let widthCenter = (targetDomRect.right + targetDomRect.left) / 2;
        let heightCenter = (targetDomRect.top + targetDomRect.bottom) / 2;
        // top
        if (targetDomRect.top > this.state.mode.heightThreshold * remInPx) {
            if (window.innerWidth - targetDomRect.right > this.state.mode.widthThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.TOP,
                    align: Align.START
                });
            }
            if (widthCenter > this.state.mode.widthThreshold * remInPx / 2 && window.innerWidth - widthCenter > this.state.mode.widthThreshold * remInPx / 2) {
                possiblePositions.push({
                    direction: Direction.TOP,
                    align: Align.CENTER
                });
            }
            if (targetDomRect.left > this.state.mode.widthThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.TOP,
                    align: Align.END
                });
            }
        }
        // right
        if (window.innerWidth - targetDomRect.right > this.state.mode.widthThreshold * remInPx) {
            if (targetDomRect.top > this.state.mode.heightThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.RIGHT,
                    align: Align.START
                });
            }
            if (heightCenter > this.state.mode.heightThreshold * remInPx / 2 && window.innerHeight - heightCenter > this.state.mode.heightThreshold * remInPx / 2) {
                possiblePositions.push({
                    direction: Direction.RIGHT,
                    align: Align.CENTER
                });
            }
            if (window.innerHeight - targetDomRect.bottom > this.state.mode.heightThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.RIGHT,
                    align: Align.END
                });
            }
        }
        // bottom
        if (window.innerHeight - targetDomRect.bottom > this.state.mode.heightThreshold * remInPx) {
            if (window.innerWidth - targetDomRect.right > this.state.mode.widthThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.BOTTOM,
                    align: Align.START
                });
            }
            if (widthCenter > this.state.mode.widthThreshold * remInPx / 2 && window.innerWidth - widthCenter > this.state.mode.widthThreshold * remInPx / 2) {
                possiblePositions.push({
                    direction: Direction.BOTTOM,
                    align: Align.CENTER
                });
            }
            if (targetDomRect.left > this.state.mode.widthThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.BOTTOM,
                    align: Align.END
                });
            }
        }
        // left
        if (targetDomRect.left > this.state.mode.widthThreshold * remInPx) {
            if (targetDomRect.top > this.state.mode.heightThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.LEFT,
                    align: Align.START
                });
            }
            if (heightCenter > this.state.mode.heightThreshold * remInPx / 2 && window.innerHeight - heightCenter > this.state.mode.heightThreshold * remInPx / 2) {
                possiblePositions.push({
                    direction: Direction.LEFT,
                    align: Align.CENTER
                });
            }
            if (window.innerHeight - targetDomRect.bottom > this.state.mode.heightThreshold * remInPx) {
                possiblePositions.push({
                    direction: Direction.LEFT,
                    align: Align.END
                });
            }
        }

        // apply forbidden and proffered positions
        for (const possiblePosition of possiblePositions) {
            for (const preferredPosition of this.state.mode.preferred) {
                if (possiblePosition.direction === preferredPosition.direction && possiblePosition.align === preferredPosition.align) {
                    this.rePositionHelper(preferredPosition);
                    return;
                }
            }
        }
        for (const possiblePosition of possiblePositions) {
            let found = false;
            for (const forbiddenPosition of this.state.mode.forbidden) {
                if (possiblePosition.direction === forbiddenPosition.direction && possiblePosition.align === forbiddenPosition.align) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.rePositionHelper(possiblePosition);
                return;
            }
        }
    }

    private rePositionHelper(position: Position): void {
        switch (this.v.position.direction) {
            case Direction.TOP:
                this.root.classList.remove(BaseTooltipStyle["direction-top"]);
                break;
            case Direction.RIGHT:
                this.root.classList.remove(BaseTooltipStyle["direction-right"]);
                break;
            case Direction.BOTTOM:
                this.root.classList.remove(BaseTooltipStyle["direction-bottom"]);
                break;
            case Direction.LEFT:
                this.root.classList.remove(BaseTooltipStyle["direction-left"]);
                break;
        }
        switch (this.v.position.align) {
            case Align.START:
                this.root.classList.remove(BaseTooltipStyle["align-start"]);
                break;
            case Align.CENTER:
                this.root.classList.remove(BaseTooltipStyle["align-center"]);
                break;
            case Align.END:
                this.root.classList.remove(BaseTooltipStyle["align-end"]);
                break;
        }
        switch (position.direction) {
            case Direction.TOP:
                this.root.classList.add(BaseTooltipStyle["direction-top"]);
                break;
            case Direction.RIGHT:
                this.root.classList.add(BaseTooltipStyle["direction-right"]);
                break;
            case Direction.BOTTOM:
                this.root.classList.add(BaseTooltipStyle["direction-bottom"]);
                break;
            case Direction.LEFT:
                this.root.classList.add(BaseTooltipStyle["direction-left"]);
                break;
        }
        switch (position.align) {
            case Align.START:
                this.root.classList.add(BaseTooltipStyle["align-start"]);
                break;
            case Align.CENTER:
                this.root.classList.add(BaseTooltipStyle["align-center"]);
                break;
            case Align.END:
                this.root.classList.add(BaseTooltipStyle["align-end"]);
                break;
        }
        this.v.position = position;
    }

    // view interface
    setTarget(target: View | null): void {
        const onAfter = () => {
            if (target !== null) {
                target.parent = this;
                target.moveIn(this.v.targetDiv);
                this.state.target = target;
            }
        };
        if (this.state.target === null) {
            onAfter();
        } else {
            this.state.target.moveOut(onAfter);
        }
    }

    setContent(content: View | null): void {
        const onAfter = () => {
            if (content !== null) {
                content.parent = this;
                content.moveIn(this.v.contentContainerDiv);
                this.state.content = content;
            }
        };
        if (this.state.content === null) {
            onAfter();
        } else {
            this.state.content.moveOut(onAfter);
        }
    }

    setMode(mode: Mode): void {
        if (!mode.autoPosition) {
            this.rePositionHelper(mode.position);
        }
        this.state.mode = mode;
    }

    setShowOnHover(showOnHover: boolean): void {
        if (!this.state.showOnHover && showOnHover) {
            this.root.classList.add(BaseTooltipStyle["show-on-hover"]);
            this.v.targetDiv.addEventListener("mouseenter", this.v.autoPositionEnterEvent);
            this.v.targetDiv.addEventListener("mouseleave", this.v.autoPositionLeaveEvent);
        }
        if (this.state.showOnHover && !showOnHover) {
            this.root.classList.remove(BaseTooltipStyle["show-on-hover"]);
            this.v.targetDiv.removeEventListener("mouseenter", this.v.autoPositionEnterEvent);
            this.v.targetDiv.removeEventListener("mouseleave", this.v.autoPositionLeaveEvent);
        }
        this.state.showOnHover = showOnHover;
    }

    setHasArrow(hasArrow: boolean): void {
        if (!this.state.hasArrow && hasArrow) {
            this.root.classList.add(BaseTooltipStyle["has-arrow"]);
        } else if (this.state.hasArrow && !hasArrow) {
            this.root.classList.remove(BaseTooltipStyle["has-arrow"]);
        }
    }

    show(): void {
        if (this.state.mode.autoPosition) {
            this.rePosition();
        }
        this.root.classList.add(BaseTooltipStyle["show"]);
        this.v.showing = true;
    }

    hide(): void {
        this.root.classList.remove(BaseTooltipStyle["show"]);
        this.v.showing = false;
    }
}