import { CrudController, IControllerBase, IControllerSearchParams } from "@dashg-enterprises/ddd-platform";
import { IExampleDto } from "../contracts/ExampleDto";
import { IExampleView } from "./models/IExampleView";
import { inject, injectable, named } from "inversify";
import { TYPES } from "../TYPES";
import { IExampleService } from "../application/ExampleService";
import { controller, httpGet } from "inversify-express-utils";
import { Request } from "express";

@controller("/examples")
export class ExampleController extends CrudController<IExampleView, IExampleDto> {
    constructor(@inject(TYPES.IExampleService) service: IExampleService) {
        super(service);
    }

    @httpGet("/")
    private search(request: Request<IControllerSearchParams<IExampleView>>) {
        super._search(request)
    }

    @httpGet("/:id")
    private getById(request: Request<{id: number}>) {
        super._getById(request);
    }

    @httpGet("/")
    private create(request: Request) {
        super._create(request);
    }

    @httpGet("/:id")
    private update(request: Request) {
        super._update(request);
    }

    @httpGet("/:id")
    private delete(request: Request<{id: number}>) {
        super._deleteById(request);
    }
}