import {Message} from "./Message";

export type MessageUpdater = ((value: string, callback: (message: Message | null, id: number) => void, id: number) => void);