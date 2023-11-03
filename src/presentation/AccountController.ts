import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { IAccountService } from "../application/services/AccountService";
import { inject } from "inversify";
import { Account } from "../infrastructure/models/Account";
import { Request } from "express";
import { TYPES } from "../TYPES";

@controller("/accounts")
export default class AccountController extends BaseHttpController {
    private _accountService: IAccountService;

    constructor(@inject(TYPES.IAccountService) accountService: IAccountService) {
        super();
        this._accountService = accountService;
    }

    @httpPost("/")
    private async createAccount(request: Request) {
        const newAccount = request.body as Account;
        const savedAccount = await this._accountService.saveAccount(newAccount);
        return savedAccount;
    }
}