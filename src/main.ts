import "reflect-metadata";

import loadContainer from "./inversify.config";
import { TYPES } from "./TYPES";
import { IUtensil } from "./example/IUtensil";
import { Food } from "./example/Food";
import { IHungryDiner } from "./example/FoodCritic";
import { Spoon } from "./example/Spoon";

const container = loadContainer();

// example one
const someGrub = new Food(100);
const utensil = container.get<IUtensil>(TYPES.IUtensil);
const foodWeScooped = utensil.scoop(someGrub);
// -- OUTPUT:
console.log("We got this much: " + foodWeScooped.amount);

// example two
const appetizer = new Food(10, true);
const main = new Food(100, false);
const dessert = new Food(50, true);
const meal = [appetizer, main, dessert];
const hungryDiner = container.get<IHungryDiner>(TYPES.IHungryDiner);
hungryDiner.eat(meal);
// -- OUTPUT:
console.log("The diner's level of satisfaction: " + hungryDiner.getSatisfaction());

// example three
const initialAmount = 10;
let freshPortion = new Food(initialAmount, true);
hungryDiner.eatOne(freshPortion);
const eatenWithFork = initialAmount - freshPortion.amount;

hungryDiner.swap(new Spoon());
//refresh portion
freshPortion = new Food(initialAmount, true);
hungryDiner.eatOne(freshPortion);
const eatenWithSpoon = initialAmount - freshPortion.amount;

// -- OUTPUT:
console.log(`Eaten with fork ${eatenWithFork} vs spoon ${eatenWithSpoon}`);