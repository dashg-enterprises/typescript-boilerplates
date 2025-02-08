import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES.js";
import { DomainError } from "../domain/DomainError.js";
import { IWishlistRepo } from "../infrastructure/WishlistRepo.js";
import { Wishlist } from "../domain/Wishlist.js";
import { Wish } from "../domain/Wish.js";

export interface IWishlistService {
    getAll(accountId: number): Promise<Wishlist[]>;
    getById(id: number): Promise<Wishlist>;
    create(name: string, accountId: number): Promise<Wishlist>
    update(id: number, name: string): Promise<Wishlist>;
    addWish(wishlistId: number, name: string, category: string, price?: number, quantity?: number): Promise<Wishlist>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class WishlistService implements IWishlistService {
    private readonly repo: IWishlistRepo;
    constructor(@inject(TYPES.IWishlistRepo) repo: IWishlistRepo) {
        this.repo = repo;
    }
    async getAll(accountId: number): Promise<Wishlist[]> {
        const wishlists = await this.repo.getAll(accountId);
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

    async addWish(wishlistId: number, name: string, category: string, price?: number, quantity?: number): Promise<Wishlist> {
        const wishlist = await this.repo.getById(wishlistId);
        wishlist.addWish(new Wish(wishlistId, name, category, price, quantity));

        const savedWishlist = await this.repo.save(wishlist);
        return savedWishlist;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.delete(id);
    }
}