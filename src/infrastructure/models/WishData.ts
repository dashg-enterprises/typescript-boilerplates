import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WishlistData } from "./WishlistData.js";

@Entity("wish")
export class WishData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    wishlistId: number;
    @Column()
    name: string;
    @Column()
    category: string;
    @Column({nullable: true})
    price?: number;
    @Column({nullable: true})
    quantity?: number;

    @ManyToOne(() => WishlistData, wishlist => wishlist.wishes)
    wishlist: WishlistData;
}