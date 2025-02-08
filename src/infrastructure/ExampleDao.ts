import { CrudDao, ICrudDao, PLATFORM_TYPES } from "@dashg-enterprises/ddd-platform";
import { ExampleData } from "./models/ExampleData";
import { TYPES } from "../TYPES";
import { inject, named } from "inversify";
import { Repository } from "typeorm";

export interface IExampleDao extends ICrudDao<ExampleData> {

}

export class ExampleDao extends CrudDao<ExampleData> implements IExampleDao {
    constructor(@inject(TYPES.ExampleDataRepository) repo: Repository<ExampleData>) {
        super(repo, "id");
    }
}