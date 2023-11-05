import "reflect-metadata";

import "./presentation/AccountController";
import loadContainer from "./inversify.config";
import { TYPES } from "./TYPES";
import { IUtensil } from "./example/IUtensil";
import { Food } from "./example/Food";
import { IHungryDiner } from "./example/FoodCritic";

const container = loadContainer();

// example one
const someGrub = new Food(100);
const utensil = container.get<IUtensil>(TYPES.IUtensil);
const howMuchWeGot = utensil.scoop(someGrub);
console.log(howMuchWeGot);

// example two
const appetizer = new Food(10, true);
const main = new Food(100, false);
const dessert = new Food(50, true);
const hungryDiner = container.get<IHungryDiner>(TYPES.IHungryDiner);
hungryDiner.eat([appetizer, main, dessert]);
console.log(hungryDiner.getSatisfaction());