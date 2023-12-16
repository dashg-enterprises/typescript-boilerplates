import { IIdentifiable } from "./IIdentifiable";

export abstract class Aggregate implements IIdentifiable {
    readonly id: number;
    constructor(id: number = null) {
        this.id = id;
    }
}
