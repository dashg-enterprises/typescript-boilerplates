import { Food } from "./Food";
import { IUtensil } from "./IUtensil";

export class Spoon implements IUtensil {
    scoop(food: Food) {
        return food.takeMost();
    }
}