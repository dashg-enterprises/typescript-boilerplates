import { Wish } from "./Wish";

export class Wishlist {
    private id: number;
    private accountId: number;
    private name: string;
    private wishes: Wish[];
    constructor(accountId: number, name: string, wishes: Wish[] = [], id?: number) {
        this.id = id;
        this.accountId = accountId;
        this.name = name;
        this.wishes = wishes;
    }

    changeName(name: string) {
        this.name = name;
    }

    getState() {
        return {
            id: this.id,
            accountId: this.accountId,
            name: this.name,
            wishes: this.wishes
        };
    }
}