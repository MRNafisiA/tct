import {UidCreator} from "./UidCreator";

class UidCreatorBase {
    private counter: number;

    constructor() {
        this.counter = 0;
    }

    getUid(): string {
        return (this.counter++).toString();
    }

    getUidCreatorInstance(): UidCreator {
        return new UidCreator(this.getUid());
    }
}

const UID_CREATOR_BASE = new UidCreatorBase();

export {UID_CREATOR_BASE};