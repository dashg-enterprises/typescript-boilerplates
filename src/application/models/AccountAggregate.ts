export class AccountAggregate {
    private username: string;
    private password: string;
    constructor(username, password) {
        this.username = username;
        this.setPassword(password);
    }
    setPassword(value: string) {
        if (!value.includes("$")) {
            throw new DomainError("Password must be stronger!");
        }
        this.password = value;
    }

    getState() {
        return {
            username: this.username,
            password: this.password
        }
    }
}

export class DomainError extends Error {
    type: "DomainError"
}