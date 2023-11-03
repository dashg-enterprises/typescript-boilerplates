import { InvariantError } from "../../../abstract-domain/errors/InvariantError";

export class PasswordStrengthError extends InvariantError {
    constructor(requiredStrength: number, strength: number) {
        super("pw should be stronger");
        this.body = {
            requiredStrength: requiredStrength,
            strength: strength,
            offBy: requiredStrength - strength
        };
    }
}
