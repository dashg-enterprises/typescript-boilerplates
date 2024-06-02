import { BaseHttpController, controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { IWishlistService } from "../application/WishlistService";
import { WishlistDto } from "./models/WishlistDto";
import { Wishlist } from "../application/models/Wishlist";

@controller("/wishlists")
export default class WishlistController extends BaseHttpController {
    service: IWishlistService;
    constructor(@inject(TYPES.IWishlistService) service: IWishlistService) {
        super();
        this.service = service;
    }

    @httpGet("/")
    private async getWishlists(request: Request) {
        const wishlists = await this.service.getAll();
        return wishlists.map(this.mapToDto);
    }

    @httpPost("/")
    private async createWishlist(@requestBody() wishlistDto: WishlistDto) {
        const wishlist = await this.service.create(wishlistDto.username, wishlistDto.password)
        return this.mapToDto(wishlist);
    }

    private mapToDto(wishlist: Wishlist) {
        const state = wishlist.getState();
        const dto = new WishlistDto();
        dto.id = state.id;
        dto.username = state.username;
        dto.password = state.password;
        return dto;
    }
}