import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { TYPES } from "../TYPES.js";
import { IConfigProvider } from "../infrastructure/ConfigProvider.js";
import { inject } from "inversify";

@controller("/config")
export default class ConfigController extends BaseHttpController {
    private readonly provider: IConfigProvider;

    constructor(@inject(TYPES.IConfigProvider) provider: IConfigProvider) {
        super();
        this.provider = provider;
    }

    @httpGet("/")
    private async checkConfig(request: Request) {
        const parameter = await this.provider.parameterByName("GITHUB_APP_CLIENT_ID");
        const secret = await this.provider.parameterByName("GITHUB_APP_CLIENT_SECRET");
        return this.ok({...process.env, parameter, secret});
    }
}