import {BodyCell} from "../types/BodyCell";

export interface BodyRow {
    id: string;
    cells: BodyCell[];
    active: boolean;
}