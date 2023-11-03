import { Repository } from "typeorm";
import { Account } from "../../../infrastructure/models/Account";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../TYPES";
import AccountAggregate from "../models/AccountAggregate";
import { AccountState } from "../models/state/AccountState";

@injectable()
export class AggregateRepository {
    private _accountRepo: Repository<Account>;
    constructor(@inject(TYPES.AccountDataRepo) accountRepo: Repository<Account>) {
        this._accountRepo = accountRepo;
    }

    save(account: AccountAggregate) {
        const accountState = account.getState();
        const accountData = this.mapToData(accountState);
        return this._accountRepo.save(accountData).then(d => this.mapToAggregate(d));
    }

    mapToData(accountState: AccountState): Account {
        const accountData = new Account();
        accountData.id = accountState.id;
        accountData.username = accountState.username;
        accountData.password = accountState.password;
        return accountData;
    }

    mapToAggregate(accountData: Account): AccountAggregate {
        const accountAggregate = new AccountAggregate(accountData.id, accountData.username, accountData.password);
        return accountAggregate;
    }
}
