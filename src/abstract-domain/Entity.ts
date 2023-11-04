import { MoreThanOneError } from "./errors/MoreThanOneError";
import { InvariantError } from "./errors/InvariantError";

export abstract class Entity<TState> {
    abstract getState(): TState;
    constructor(protected _id: number) {

    }

    protected abstract gatherInvariants(): InvariantError[];
    protected validate(): void {
        const invariants = this.gatherInvariants();
        if (!invariants) return;
        if (invariants.length === 1) throw invariants[0];

        throw new MoreThanOneError(invariants);
    }
}
