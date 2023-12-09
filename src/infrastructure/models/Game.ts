import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from "typeorm";
import { Account } from "./Account";
import { Invitation } from "./Invitation";

// Data model
@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    accountId: number;
    @Column()
    name: string;
    @ManyToOne(() => Account, (account) => account.games)
    account?: Account[];
    @OneToMany(() => Invitation, invitation => invitation.game, {cascade: true, eager: true})
    invitations?: Invitation[];
}