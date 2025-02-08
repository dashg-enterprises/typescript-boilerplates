import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES.js";
import { DomainError } from "../domain/DomainError.js";
import { IAccountRepo } from "../infrastructure/AccountRepo.js";
import { Account } from "../domain/Account.js";

export interface IAccountService {
    getAll(): Promise<Account[]>;
    getById(id: number): Promise<Account>;
    create(username: string, password: string): Promise<Account>;
    update(id: number, password: string): Promise<Account>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class AccountService implements IAccountService {
    private readonly repo: IAccountRepo;
    constructor(@inject(TYPES.IAccountRepo) repo: IAccountRepo) {
        this.repo = repo;
    }
    async getAll(): Promise<Account[]> {
        const accounts = await this.repo.getAll();
        return accounts;
    }
    async getById(id: number): Promise<Account> {
        const account = await this.repo.getById(id);
        return account;
    }

    async create(username: string, password: string): Promise<Account> {
        const account = new Account(username, password);
        const savedAccount = await this.repo.save(account);
        return savedAccount;
    }

    async update(id: number, password: string): Promise<Account> {
        const account = await this.repo.getById(id);
        account.setPassword(password);

        const savedAccount = await this.repo.save(account);
        return savedAccount;
    }
    async delete(id: number): Promise<boolean> {
        return await this.repo.delete(id);
    }
}