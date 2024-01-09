export class Dog {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    bark() {
        return "woof, says " + this.name;
    }
}