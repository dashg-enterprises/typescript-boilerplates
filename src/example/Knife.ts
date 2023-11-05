import { Food } from "./Food";
import { IUtensil } from "./IUtensil";

export class Knife implements IUtensil {
    scoop(food: Food) {
        return food.takeSome();
    }
}