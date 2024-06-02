import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WishData } from "./WishData";

@Entity("wishlist")
export class WishlistData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    accountId: number;
    @Column()
    name: string;
    @OneToMany(() => WishData, wish => wish.wishlist)
    wishes: WishData[];
}