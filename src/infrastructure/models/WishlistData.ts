import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WishData } from "./WishData";
import { Account } from "../../application/models/Account";
import { AccountData } from "./AccountData";

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