export class Food {
    amount: number;
    isFancy: boolean;
    constructor(amount: number, isFancy: boolean = false) {
        this.amount = amount;
        this.isFancy = isFancy;
    }

    takeMost() {
        const ninetyPercent = this.amount * 0.9;
        this.amount = this.amount - ninetyPercent;
        return new Food(ninetyPercent);
    }

    takeHalf() {
        const fiftyPercent = this.amount * 0.5;
        this.amount = this.amount - fiftyPercent;
        return new Food(fiftyPercent);
    }

    takeSome() {
        const twentyPercent = this.amount * 0.2;
        this.amount = this.amount - twentyPercent;
        return new Food(twentyPercent);
    }
}