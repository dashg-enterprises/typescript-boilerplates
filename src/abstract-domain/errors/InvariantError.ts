
export class InvariantError extends Error {
    type: "InvariantError" = "InvariantError";
    subtype: "ConstructorError" | "CommandError" = "ConstructorError";
    body: object;
    constructor(message: string) {
        super(message);
    }
}
