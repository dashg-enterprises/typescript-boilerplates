import { BaseHttpController, controller, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES.js";
import { IWishlistService } from "../application/WishlistService.js";
import { Wishlist } from "../domain/Wishlist.js";
import { WishDto, WishlistDto } from "./models/WishlistDto.js";

@controller("/accounts/:accountId/wishlists")
export default class WishlistController extends BaseHttpController {
    service: IWishlistService;
    constructor(@inject(TYPES.IWishlistService) service: IWishlistService) {
        super();
        this.service = service;
    }

    @httpGet("/")
    private async getWishlists(@requestParam("accountId") accountId: string) {
        const wishlists = await this.service.getAll(+accountId);
        return wishlists.map(this.mapToDto);
    }

    @httpPost("/")
    private async createWishlist(@requestBody() wishlistDto: WishlistDto) {
        const wishlist = await this.service.create(wishlistDto.name, wishlistDto.accountId);
        return this.mapToDto(wishlist);
    }

    @httpPut("/:id")
    private async updateWishlist(@requestBody() wishlistDto: WishlistDto) {
        const wishlist = await this.service.update(wishlistDto.id, wishlistDto.name);
        return this.mapToDto(wishlist);
    }

    @httpPost("/:id/wishes")
    private async addWish(@requestBody() wishDto: WishDto) {
        const wishlist = await this.service.addWish(wishDto.wishlistId, wishDto.name, wishDto.category, wishDto.price, wishDto.quantity);
        return this.mapToDto(wishlist);
    }

    private mapToDto(wishlist: Wishlist) {
        const state = wishlist.getState();
        const dto = new WishlistDto();
        dto.id = state.id;
        dto.name = state.name;
        dto.accountId = state.accountId;
        dto.wishes = state.wishes.map(wish => {
            const wishDto = new WishDto();
            const wishState = wish.getState();
            wishDto.id = wishState.id;
            wishDto.wishlistId = wishState.wishlistId;
            wishDto.name = wishState.name;
            wishDto.category = wishState.category;
            wishDto.price = wishState.price;
            wishDto.quantity = wishState.quantity;
            return wishDto;
        });
        return dto;
    }
}