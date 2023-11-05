import { inject, injectable } from "inversify";
import { Food } from "./Food";
import { IUtensil } from "./IUtensil";
import { TYPES } from "../TYPES";

export interface IHungryDiner {
    swap(utensil: IUtensil): IUtensil;
    eatOne(food: Food): Food;
    eat(meal: Food[]): Food[];
    getSatisfaction(): number; 
}

@injectable()
export class FoodCritic implements IHungryDiner {
    utensil: IUtensil;
    fullness: number = 0;
    complaints: number = 0;
    constructor(@inject(TYPES.IUtensil) utensil: IUtensil) {
        this.utensil = utensil;
    }

    swap(utensil: IUtensil): IUtensil {
        this.utensil = utensil;
        return this.utensil;
    }

    eatOne(food: Food): Food {
        if (food.isFancy) {
            const foodEaten = this.utensil.scoop(food);
            this.fullness += this.fullness + foodEaten.amount;
        } else {
            this.complaints++;
        }
        return food;
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