import { Food } from "./Food";
import { IUtensil } from "./IUtensil";
import { injectable } from "inversify";

@injectable()
export class Knife implements IUtensil {
    scoop(food: Food) {
        return food.takeSome();
    }
}