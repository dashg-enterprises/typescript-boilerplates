import { Food } from "./Food";
import { IUtensil } from "./IUtensil";

export class Fork implements IUtensil {
    scoop(food: Food) {
        return food.takeHalf();
    }
}