import { Person } from "./other/Person";
import { Dog } from "./other/Dog";

var x = 2;
x = x + 1;
x = 9;

let y = 4;
y = 5;

let currentPatient = new Dog("Fido");
currentPatient.bark();
currentPatient = new Dog("Bessy");

const pi = 3.14;

let sum = 0;
for (let index = 0; index < 10; index++) {
    sum = sum + index;
}

const name = "Chad";
const age = 32;
const weight = 220;

const person = {
    name: "Chad",
    age: 32,
    weight: 220
};

const person2 = {
    weight: 180,
    name: "Scott",
    age: 64,
};

const map = {
    ["age"]: 70,
    ["name"]: "Bob",
    ["weight"]: 150,
    ["john-jacob"]: 11111
};

map["age"];


// map, dictionary, key-value pairs

const list = ["apple"];
list[list.length - 1];
list.push("banana");

const p1 = new Person("Chad");
const p2 = new Person("Scott");

p1.payTaxes();
p2.payTaxes();