export class UidCreator {
    private readonly prefix: string;
    private counter: number;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.counter = 1;
    }

    getUid(): string {
        return this.prefix + "-" + (this.counter++).toString();
    }
}