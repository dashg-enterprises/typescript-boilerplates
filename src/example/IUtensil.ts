import { Food } from "./Food";

export interface IUtensil {
    scoop(food: Food): Food;
}