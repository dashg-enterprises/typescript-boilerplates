export class DomainError extends Error {
    readonly type: string = "DomainError";
    constructor(message: string) {
        super(message);
    }
}
