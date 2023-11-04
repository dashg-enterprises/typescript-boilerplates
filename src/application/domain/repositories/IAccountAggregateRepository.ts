import AccountAggregate from "../models/AccountAggregate";

export interface IAccountAggregateRepository {
    save(account: AccountAggregate): Promise<AccountAggregate>;
}
