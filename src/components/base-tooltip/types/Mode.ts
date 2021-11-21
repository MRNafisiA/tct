import {Position} from "./Position";

export type Mode = {
    autoPosition: true;
    widthThreshold: number;
    heightThreshold: number;
    preferred: Position[];
    forbidden: Position[];
} | {
    autoPosition: false;
    position: Position;
};