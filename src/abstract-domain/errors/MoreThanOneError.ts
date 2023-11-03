import { InvariantError } from "./InvariantError";


export class MoreThanOneError extends Error {
    type: "MoreThanOneError" = "MoreThanOneError";
    errors: InvariantError[];
    constructor(errors: InvariantError[]) {
        super("More than one error has occurred");
        this.errors = errors;
    }
}
