import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "../TYPES";
import { AccountData } from "./models/AccountData";
import { Account } from "../application/models/Account";

export interface IAccountRepo {
    // factory method -> purpose is to call the constructor
    create(username: string, password: string, id?: number): Account;

    getById(id: number): Promise<Account>;
    getAll(): Promise<Account[]>;
    save(account: Account): Promise<Account>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class AccountRepo implements IAccountRepo {
    // private readonly dataRepo: Repository<AccountData>;
    private readonly data: AccountData[] = [];
    // constructor(@inject(TYPES.AccountDataRepo) dataRepo: Repository<AccountData>) {
    //     this.dataRepo = dataRepo;
    // }

    // factory method, just calling constructor for us
    create(username: string, password: string, id: number = null): Account {
        return new Account(username, password, id);
    }

    async getById(id: number): Promise<Account> {
        // const dataModel = await this.dataRepo.findOneBy({id: id});
        const dataModel = this.data.find(a => a.id === id);
        return this.mapToAggregateModel(dataModel);
    }
    async getAll(): Promise<Account[]> {
        // const dataModels = await this.dataRepo.find();
        const dataModels = this.data;
        return dataModels.map(dataModel => this.mapToAggregateModel(dataModel));
    }
    async save(account: Account): Promise<Account> {
        const dataModel = this.mapToDataModel(account);
        // const savedDataModel = await this.dataRepo.save(dataModel);
        this.data.push(dataModel);
        return this.mapToAggregateModel(dataModel);
    }
    async delete(id: number): Promise<boolean> {
        try {
            // await this.dataRepo.delete(id);
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

    private mapToAggregateModel(accountData: AccountData) {
        const account = this.create(accountData.username, accountData.password, accountData.id);
        return account;
    }

}