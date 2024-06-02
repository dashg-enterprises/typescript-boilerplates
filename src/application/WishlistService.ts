import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { DomainError } from "./models/DomainError";
import { IWishlistRepo } from "../infrastructure/WishlistRepo";
import { Wishlist } from "./models/Wishlist";

export interface IWishlistService {
    getAll(): Promise<Wishlist[]>;
    getById(id: number): Promise<Wishlist>;
    create(name: string, accountId: number): Promise<Wishlist>
    update(id: number, name: string): Promise<Wishlist>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class WishlistService implements IWishlistService {
    private readonly repo: IWishlistRepo;
    constructor(@inject(TYPES.IWishlistRepo) repo: IWishlistRepo) {
        this.repo = repo;
    }
    async getAll(): Promise<Wishlist[]> {
        const wishlists = await this.repo.getAll();
        return wishlists;
    }
    async getById(id: number): Promise<Wishlist> {
        const wishlist = await this.repo.getById(id);
        return wishlist;
    }

    async create(name: string, accountId: number): Promise<Wishlist> {
        const wishlist = new Wishlist(accountId, name);
        const savedWishlist = await this.repo.save(wishlist);
        return savedWishlist;
    }

    async update(id: number, name: string): Promise<Wishlist> {
        const wishlist = await this.repo.getById(id);
        wishlist.changeName(name);

        const savedWishlist = await this.repo.save(wishlist);
        return savedWishlist;
    }
    async delete(id: number): Promise<boolean> {
        return await this.repo.delete(id);
    }
}