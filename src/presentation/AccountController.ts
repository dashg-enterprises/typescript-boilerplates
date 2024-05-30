import { BaseHttpController, controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { IAccountService } from "../application/AccountService";
import { AccountDto } from "./models/AccountDto";
import { Account } from "../application/models/Account";

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

    @httpPost("/")
    private async createAccount(@requestBody() accountDto: AccountDto) {
        const accounts = await this.service.create(accountDto.username, accountDto.password)
        return accounts;
    }

    private mapToDto(account: Account) {
        const state = account.getState();
        const dto = new AccountDto();
        dto.id = state.id;
        dto.username = state.username;
        dto.password = state.password;
        return dto;
    }
}