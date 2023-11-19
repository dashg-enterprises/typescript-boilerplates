import { inject, injectable } from "inversify";
import { Account } from "../infrastructure/models/Account";
import { TYPES } from "../TYPES";
import { Repository } from "typeorm";
import { AccountDto } from "../presentation/models/AccountDto";
import { AccountAggregate, DomainError } from "./models/AccountAggregate";

export interface IAccountService {
    getAll(): Promise<AccountDto[]>;
    getById(id: number): Promise<AccountDto>;
    create(account: AccountDto): Promise<AccountDto>;
    update(account: AccountDto): Promise<AccountDto>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class AccountService implements IAccountService {
    private readonly repo: Repository<Account>;
    constructor(@inject(TYPES.AccountDataRepo) repo: Repository<Account>) {
        this.repo = repo;
    }
    async getAll(): Promise<AccountDto[]> {
        const accounts = await this.repo.find();
        return accounts.map(account => this.mapToDto(account));
    }
    async getById(id: number): Promise<AccountDto> {
        const account = await this.repo.findOneBy({id: id});
        return this.mapToDto(account);
    }

    async create(accountDto: AccountDto): Promise<AccountDto> {
        const account = new AccountAggregate(accountDto.name, accountDto.security);
        const dataModel = this.mapToDataModelFromAgg(account);
        const savedDataModel = await this.repo.save(dataModel);
        return this.mapToDto(savedDataModel);
    }

    async update(accountDto: AccountDto): Promise<AccountDto> {
        const existingAccount = await this.repo.findOneBy({id: accountDto.id});
        if (!existingAccount) {
            return null;
        }

        // prevent invariants
        const agg = new AccountAggregate(existingAccount.username, existingAccount.password);
        agg.setPassword(accountDto.security);

        const dataModel = this.mapToDataModelFromAgg(agg);
        const savedDataModel = await this.repo.save(dataModel);
        return this.mapToDto(savedDataModel);
    }
    async delete(id: number): Promise<boolean> {
        try {
            await this.repo.delete(id);
            return true;
        } catch(error) {
            return false;
        }
    }

    private mapToDto(account: Account) {
        const dto = new AccountDto();
        dto.name = account.username;
        dto.security = account.password;
        return dto;
    }
    
    private mapToDataModel(account: AccountDto) {
        const dataModel = new Account();
        dataModel.username = account.name;
        dataModel.password = account.security;
        return dataModel;
    }

    private mapToDataModelFromAgg(account: AccountAggregate) {
        const state = account.getState();
        const dataModel = new Account();
        dataModel.username = state.username;
        dataModel.password = state.password;
        return dataModel;
    }
}