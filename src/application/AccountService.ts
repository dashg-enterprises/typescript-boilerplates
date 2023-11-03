import { Repository } from "typeorm";
import { Account } from "../infrastructure/models/Account";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import AccountAggregate from "./domain/models/AccountAggregate";
import { AggregateRepository } from "./domain/repositories/AggregateRepository";

export interface IAccountService {
    saveAccount(account: Account): Promise<Account>;
}

@injectable()
export class AccountService implements IAccountService {
    private _accountRepo: Repository<Account>;
    private _aggregateRepo: AggregateRepository;
    constructor(@inject(TYPES.AccountDataRepo) accountRepo: Repository<Account>) {
        this._accountRepo = accountRepo;
        this._aggregateRepo = new AggregateRepository(accountRepo);
    }

    saveAccount(account: Account) {
        const accountAggregate = new AccountAggregate(account.id, account.username, account.password);
        this._aggregateRepo.save(accountAggregate);
        return this._accountRepo.save(account);
    }
}