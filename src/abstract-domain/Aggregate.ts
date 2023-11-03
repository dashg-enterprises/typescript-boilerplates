import { MoreThanOneError } from "./errors/MoreThanOneError";
import { InvariantError } from "./errors/InvariantError";

export abstract class Aggregate<TState> {
    abstract getState(): TState;

    protected abstract gatherInvariants(): InvariantError[];
    protected validate(): void {
        const invariants = this.gatherInvariants();
        if (!invariants) return;
        if (invariants.length === 1) throw invariants[0];

        throw new MoreThanOneError(invariants);
    }
}
