import { CrudService, ICrudService } from "@dashg-enterprises/ddd-platform/lib/crud";
import { Example } from "../domain/Example.js";
import { IExampleDto } from "../contracts/ExampleDto.js";
import { ExampleData } from "../infrastructure/models/ExampleData.js";
import { IExampleDao } from "../infrastructure/ExampleDao.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES.js";

export interface IExampleService extends ICrudService<Example> {
    
}

@injectable()
export class ExampleService extends CrudService<Example, IExampleDto, ExampleData> implements ICrudService<Example> {
    constructor(@inject(TYPES.IExampleDao) dao: IExampleDao) {
        super(dao);
    }
}
