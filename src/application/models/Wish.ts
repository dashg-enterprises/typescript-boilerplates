export class Wish {
    private id?: number;
    private wishlistId: number;
    private name: string;
    private category: string;
    private price?: number;
    private quantity?: number;
    constructor(wishlistId: number, name: string, category: string, price?: number, quantity?: number, id?: number) {
        this.id = id;
        this.wishlistId = wishlistId;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    getState() {
        return {
            id: this.id,
            wishlistId: this.wishlistId,
            name: this.name,
            category: this.category,
            price: this.price,
            quantity: this.quantity
        };
    }
}