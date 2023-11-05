import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { Account } from "../infrastructure/models/Account";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { Repository } from "typeorm";

@controller("/accounts")
export default class AccountController extends BaseHttpController {
    repo: Repository<Account>;
    constructor(@inject(TYPES.AccountDataRepo) repo: Repository<Account>) {
        super();
        this.repo = repo;
    }

    @httpPost("/")
    private createAccount(request: Request) {
        const newAccount = request.body as Account;
        return this.repo.save(newAccount);
    }
}