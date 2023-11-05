import { inject, injectable } from "inversify";
import { Food } from "./Food";
import { IUtensil } from "./IUtensil";
import { TYPES } from "../TYPES";

export interface IHungryDiner {
    eat(meal: Food[]): Food[];
    getSatisfaction(): number; 
}

@injectable()
export class FoodCritic implements IHungryDiner {
    utensil: IUtensil;
    fullness: number;
    complaints: number;
    constructor(@inject(TYPES.IUtensil) utensil: IUtensil) {
        this.utensil = utensil;
    }

    eat(meal: Food[]): Food[] {
        for (let course of meal) {
            if (course.isFancy) {
                const foodEaten = this.utensil.scoop(course);
                this.fullness += this.fullness + foodEaten.amount;
            } else {
                this.complaints++;
            }
        }
        return meal;
    }

    getSatisfaction(): number {
        return this.fullness/this.complaints;
    }
}