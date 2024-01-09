export class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    payTaxes() {
        console.log("Please nooooooo, says " + this.name);
    }
}
