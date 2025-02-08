import { CrudService, ICrudService } from "@dashg-enterprises/ddd-platform/lib/crud";
import { Example } from "../domain/Example";
import { IExampleDto } from "../contracts/ExampleDto";
import { ExampleData } from "../infrastructure/models/ExampleData";
import { IExampleDao } from "../infrastructure/ExampleDao";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";

export interface IExampleService extends ICrudService<Example> {
    
}

@injectable()
export class ExampleService extends CrudService<Example, IExampleDto, ExampleData> implements ICrudService<Example> {
    constructor(@inject(TYPES.IExampleDao) dao: IExampleDao) {
        super(dao);
    }
}
