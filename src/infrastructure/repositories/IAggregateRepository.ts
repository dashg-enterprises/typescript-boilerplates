import AccountAggregate from "../../application/domain/models/AccountAggregate";

interface IAggregateRepository {
    save(account: AccountAggregate): Promise<AccountAggregate>;
}
