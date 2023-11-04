import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { Account } from "./Account";
import { Post } from "./Post";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    name: string;

    @ManyToOne(() => Account, (account) => account.topics)
    account?: Account

    @OneToMany(() => Post, (post) => post.topic, {cascade: true, eager: true})
    posts: Post[];
}