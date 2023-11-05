import { Food } from "./Food";
import { IUtensil } from "./IUtensil";
import { injectable } from "inversify";

@injectable()
export class Spoon implements IUtensil {
    scoop(food: Food) {
        return food.takeMost();
    }
}