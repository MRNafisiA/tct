import {BodyCellType} from "../enums/BodyCellType";
import {PXView} from "./PXView";

export type BodyCell = ({
    type: BodyCellType.TEXT;
    value: string;
} | {
    type: BodyCellType.VIEW;
    value: PXView;
}) & {
    colSpan: number;
};