// DTO - data transfer object
export class WishlistDto {
    id: number;
    accountId: number;
    name: string;
    wishes: WishDto[];
}

export class WishDto {
    id: number;
    wishlistId: number;
    name: string;
    category: string;
    price?: number;
    quantity?: number;
}