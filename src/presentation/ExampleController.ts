import { CrudController, IControllerBase, IControllerSearchParams } from "@dashg-enterprises/ddd-platform";
import { IExampleDto } from "../contracts/ExampleDto.js";
import { IExampleView } from "./models/IExampleView.js";
import { inject, injectable, named } from "inversify";
import { TYPES } from "../TYPES.js";
import { IExampleService } from "../application/ExampleService.js";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request } from "express";

@controller("/examples")
export class ExampleController extends CrudController<IExampleView, IExampleDto> {
    constructor(@inject(TYPES.IExampleService) service: IExampleService) {
        super(service);
    }

    @httpGet("/")
    private async search(request: Request<IControllerSearchParams<IExampleView>>) {
        return await super._search(request)
    }

    @httpGet("/:id")
    private async getById(request: Request<{id: number}>) {
        return await super._getById(request);
    }

    @httpPost("/")
    private async create(request: Request) {
        return await super._create(request);
    }

    @httpPut("/:id")
    private async update(request: Request) {
        return await super._update(request);
    }

    @httpDelete("/:id")
    private async delete(request: Request<{id: number}>) {
        return await super._deleteById(request);
    }
}