import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Account } from "./Account";
import { Game } from "./Game";

// Data model
@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    accountId: number;
    @Column()
    gameId: number;
    @Column()
    message: string;
    @ManyToOne(() => Account, (account) => account.invitations)
    account?: Account;
    @ManyToOne(() => Game, game => game.invitations)
    game?: Game;
}