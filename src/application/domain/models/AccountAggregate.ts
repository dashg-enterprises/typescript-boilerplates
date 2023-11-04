import { AccountState } from "./state/AccountState";
import { PasswordStrengthError } from "../errors/PasswordStrengthError";
import { Aggregate } from "../../../abstract-domain/Aggregate";
import { InvariantError } from "../../../abstract-domain/errors/InvariantError";

export default class AccountAggregate extends Aggregate<AccountState> {
    private _username: string;
    private _password: string;
    private _numberOfResets: number;
    constructor(id: number, username: string, password: string) {
        super(id);
        this._username = username;
        this._password = password;
        this.validate();
    }

    protected gatherInvariants(): InvariantError[] {       
        const invariants = [];
        const required = this.getRequiredPasswordStrength();
        const strength = this.getPasswordStrength();
        if (strength < required) {
            invariants.push(new PasswordStrengthError(strength, required));
        }
        invariants.push(new PasswordStrengthError(1, 100));
        invariants.push(new PasswordStrengthError(9, 10));
        return invariants;
    }

    getPasswordStrength() {
        return this._password.length;
    }

    getRequiredPasswordStrength() {
        return this._password.length;
    }

    getState(): AccountState {
        return {
            id: this._id,
            username: this._username,
            password: this._password
        }
    }
}

