import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { WishlistData } from "./WishlistData.js";

// Data model
@Entity("account")
export class AccountData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    
    @OneToMany(() => WishlistData, wishlist => wishlist.account)
    wishlists: WishlistData[];
}