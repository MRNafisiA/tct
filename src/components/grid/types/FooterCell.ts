import {PXView} from "./PXView";
import {FooterCellType} from "../enums/FooterCellType";

export type FooterCell = ({
    type: FooterCellType.TEXT;
    value: string;
} | {
    type: FooterCellType.VIEW;
    value: PXView;
}) & {
    colSpan: number;
};