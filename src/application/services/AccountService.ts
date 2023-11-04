import { Repository } from "typeorm";
import { Account } from "../../infrastructure/models/Account";
import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES";
import AccountAggregate from "../domain/models/AccountAggregate";
import { AccountAggregateRepository } from "../../infrastructure/repositories/AccountAggregateRepository";
import { AccountState } from "../domain/models/state/AccountState";

export interface IAccountService {
    saveAccount(account: Account): Promise<AccountState>;
}

@injectable()
export class AccountService implements IAccountService {
    private _aggregateRepo: AccountAggregateRepository;
    constructor(@inject(TYPES.AccountDataRepo) accountRepo: Repository<Account>) {
        this._aggregateRepo = new AccountAggregateRepository(accountRepo);
    }

    saveAccount(account: Account) {
        const accountAggregate = new AccountAggregate(account.id, account.username, account.password);
        return this._aggregateRepo.save(accountAggregate).then(account => account.getState());
    }
}