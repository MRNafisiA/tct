import {HeaderCellType} from "../enums/HeaderCellType";
import {Align} from "../enums/Align";
import {PXView} from "./PXView";
import {View} from "../../../view/View";

export type HeaderCell =
    ({
        type: HeaderCellType.TEXT;
        value: string;
    } | {
        type: HeaderCellType.VIEW;
        value: PXView;
    }) &
    ({
        hasSeparator: true;
        responsive: true;
        minWidth: number;
    } | {
        hasSeparator: true;
        responsive: false;
    } | {
        hasSeparator: false;
    }) &
    {
        align: Align;
        width: number;
        draggable: boolean;
        tools: View[];
    };