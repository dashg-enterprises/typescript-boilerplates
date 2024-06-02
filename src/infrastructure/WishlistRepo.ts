import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "../TYPES";
import { WishlistData } from "./models/WishlistData";
import { Wishlist } from "../application/models/Wishlist";
import { WishData } from "./models/WishData";
import { Wish } from "../application/models/Wish";

export interface IWishlistRepo {
    getById(id: number): Promise<Wishlist>;
    getAll(): Promise<Wishlist[]>;
    save(wishlist: Wishlist): Promise<Wishlist>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class WishlistRepo implements IWishlistRepo {
    private readonly dataRepo: Repository<WishlistData>;

    constructor(@inject(TYPES.WishlistDataRepo) dataRepo: Repository<WishlistData>) {
        this.dataRepo = dataRepo;
    }

    async getById(id: number): Promise<Wishlist> {
        const dataModel = await this.dataRepo.findOneBy({id: id});
        return this.mapToDomainModel(dataModel);
    }
    async getAll(): Promise<Wishlist[]> {
        const dataModels = await this.dataRepo.find();
        return dataModels.map(dataModel => this.mapToDomainModel(dataModel));
    }
    async save(wishlist: Wishlist): Promise<Wishlist> {
        const dataModel = this.mapToDataModel(wishlist);
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

    private mapToDataModel(wishlist: Wishlist) {
        const state = wishlist.getState();
        const dataModel = new WishlistData();
        dataModel.id = state.id;
        dataModel.accountId = state.accountId;
        dataModel.name = state.name;
        dataModel.wishes = state.wishes.map(wish => {
            const wishData = new WishData();
            const wishState = wish.getState();
            wishData.id = wishState.id;
            wishData.name = wishState.name;
            wishData.category = wishState.category;
            wishData.price = wishState.price;
            wishData.quantity = wishState.quantity;
            return wishData;
        })
        return dataModel;
    }

    private mapToDomainModel(wishlistData: WishlistData) {
        const wishes = wishlistData.wishes.map(wishData => {
            return new Wish(wishData.wishlistId, wishData.name, wishData.category, wishData.price, wishData.quantity);
        });
        const wishlist = new Wishlist(wishlistData.accountId, wishlistData.name, wishes, wishlistData.id);
        return wishlist;
    }

}