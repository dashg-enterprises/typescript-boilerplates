import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Game } from "./Game";
import { Invitation } from "./Invitation";

// Data model
@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @OneToMany(() => Game, (game) => game.account)
    games?: Game[];
    @OneToMany(() => Invitation, (invitation) => invitation.account)
    invitations?: Invitation[];
}