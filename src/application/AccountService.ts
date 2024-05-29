import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { AccountDto } from "../presentation/models/AccountDto";
import { DomainError } from "./models/DomainError";
import { IAccountRepo } from "../infrastructure/AccountRepo";
import { Account } from "./models/Account";

export interface IAccountService {
    getAll(): Promise<AccountDto[]>;
    getById(id: number): Promise<AccountDto>;
    create(account: AccountDto): Promise<AccountDto>;
    update(account: AccountDto): Promise<AccountDto>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class AccountService implements IAccountService {
    private readonly repo: IAccountRepo;
    constructor(@inject(TYPES.IAccountRepo) repo: IAccountRepo) {
        this.repo = repo;
    }
    async getAll(): Promise<AccountDto[]> {
        const accounts = await this.repo.getAll();
        return accounts.map(account => this.mapToDto(account));
    }
    async getById(id: number): Promise<AccountDto> {
        const account = await this.repo.getById(id);
        return this.mapToDto(account);
    }

    async create(accountDto: AccountDto): Promise<AccountDto> {
        const account = this.repo.create(accountDto.name, accountDto.security);
        const savedAccount = await this.repo.save(account);
        return this.mapToDto(savedAccount);
    }

    async update(accountDto: AccountDto): Promise<AccountDto> {
        const account = await this.repo.getById(accountDto.id);
        account.setPassword(accountDto.security);

        const savedAccount = await this.repo.save(account);
        return this.mapToDto(savedAccount);
    }
    async delete(id: number): Promise<boolean> {
        return await this.repo.delete(id);
    }

    private mapToDto(account: Account) {
        const state = account.getState();
        const dto = new AccountDto();
        dto.id = state.id;
        dto.name = state.username;
        dto.security = state.password;
        return dto;
    }
}