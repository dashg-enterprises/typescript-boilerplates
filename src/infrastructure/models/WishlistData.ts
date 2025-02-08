import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WishData } from "./WishData.js";
import { Account } from "../../domain/Account.js";
import { AccountData } from "./AccountData.js";

@Entity("wishlist")
export class WishlistData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    accountId: number;
    @Column()
    name: string;
    @OneToMany(() => WishData, wish => wish.wishlist, {cascade: true, eager: true})
    wishes: WishData[];

    @ManyToOne(() => AccountData, account => account.wishlists)
    account: Account;
}