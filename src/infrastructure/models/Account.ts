import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Topic } from "./Topic";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @OneToMany(() => Topic, (topic) => topic.account)
    topics: Topic[];
}