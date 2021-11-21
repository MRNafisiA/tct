import {Status} from "../enums/Status";

export type StatusUpdater = ((value: string, callback: (status: Status, id: number) => void, id: number) => void);