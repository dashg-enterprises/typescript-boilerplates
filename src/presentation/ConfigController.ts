import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { TYPES } from "../TYPES.js";
import { inject } from "inversify";
import { IConfigProvider, PLATFORM_TYPES } from "@dashg-enterprises/ddd-platform";

@controller("/config")
export default class ConfigController extends BaseHttpController {
    private readonly provider: IConfigProvider;

    constructor(@inject(PLATFORM_TYPES.IConfigProvider) provider: IConfigProvider) {
        super();
        this.provider = provider;
    }

    @httpGet("/")
    private async checkConfig(request: Request) {
        try {
            const parameter = await this.provider.parameterByName("GITHUB_APP_CLIENT_ID");
            const secret = await this.provider.secretByName("GITHUB_APP_CLIENT_SECRET");
            return this.ok({...process.env, parameter, secret});
        } catch(e) {
            return this.internalServerError(e);
        }
    }
}