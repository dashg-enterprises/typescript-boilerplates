import { DomainError } from "./DomainError.js";

// Domain model
export class Account {
    private id?: number;
    private username: string;
    private password: string;
    constructor(username, password, id = null) {
        this.id = id;
        this.username = username;
        
        if (this.id) this.password = password;
        else this.setPassword(password);
    }
    setPassword(value: string) {
        if (!value.includes("$")) {
            throw new DomainError("Password must be stronger!");
        }
        this.password = value;
    }

    getState() {
        return {
            id: this.id,
            username: this.username,
            password: this.password
        }
    }
}

