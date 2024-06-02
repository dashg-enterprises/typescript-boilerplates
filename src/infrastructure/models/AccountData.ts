import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";

// Data model
@Entity("account")
export class AccountData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
}