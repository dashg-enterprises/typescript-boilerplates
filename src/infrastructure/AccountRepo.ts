import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "../TYPES.js";
import { AccountData } from "./models/AccountData.js";
import { Account } from "../domain/Account.js";

export interface IAccountRepo {
    getById(id: number): Promise<Account>;
    getAll(): Promise<Account[]>;
    save(account: Account): Promise<Account>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class AccountRepo implements IAccountRepo {
    private readonly dataRepo: Repository<AccountData>;

    constructor(@inject(TYPES.AccountDataRepo) dataRepo: Repository<AccountData>) {
        this.dataRepo = dataRepo;
    }

    async getById(id: number): Promise<Account> {
        const dataModel = await this.dataRepo.findOneBy({id: id});
        return this.mapToDomainModel(dataModel);
    }
    async getAll(): Promise<Account[]> {
        const dataModels = await this.dataRepo.find();
        return dataModels.map(dataModel => this.mapToDomainModel(dataModel));
    }
    async save(account: Account): Promise<Account> {
        const dataModel = this.mapToDataModel(account);
        const savedDataModel = await this.dataRepo.save(dataModel);
        return this.mapToDomainModel(savedDataModel);
    }
    async delete(id: number): Promise<boolean> {
        try {
            await this.dataRepo.delete(id);
            return true;
        } catch(error) {
            return false;
        }
    }

    private mapToDataModel(account: Account) {
        const state = account.getState();
        const dataModel = new AccountData();
        dataModel.id = state.id;
        dataModel.username = state.username;
        dataModel.password = state.password;
        return dataModel;
    }

    private mapToDomainModel(accountData: AccountData) {
        const account = new Account(accountData.username, accountData.password, accountData.id);
        return account;
    }

}