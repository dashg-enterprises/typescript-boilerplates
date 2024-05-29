import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { IAccountService } from "../application/AccountService";
import { AccountDto } from "./models/AccountDto";

@controller("/accounts")
export default class AccountController extends BaseHttpController {
    service: IAccountService;
    constructor(@inject(TYPES.IAccountService) service: IAccountService) {
        super();
        this.service = service;
    }

    @httpGet("/")
    private async getAccounts(request: Request) {
        const accounts = await this.service.getAll();
        return accounts;
    }

    @httpGet("/testing")
    private async testAccounts(request: Request) {
        return this.ok();
    }
}