import AccountAggregate from "../../application/domain/models/AccountAggregate";

export interface IAccountAggregateRepository {
    save(account: AccountAggregate): Promise<AccountAggregate>;
}
