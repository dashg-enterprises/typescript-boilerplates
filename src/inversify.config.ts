import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./TYPES";
import { IUtensil } from "./example/IUtensil";
import { Spoon } from "./example/Spoon";
import { Knife } from "./example/Knife";
import { Fork } from "./example/Fork";
import { FoodCritic, IHungryDiner } from "./example/FoodCritic";

export default function getContainer() {
    const container = new Container();
    container.bind<IUtensil>(TYPES.IUtensil).to(Fork);
    container.bind<IHungryDiner>(TYPES.IHungryDiner).to(FoodCritic);
    return container;
}