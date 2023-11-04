import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Account } from "./Account";
import { Topic } from "./Topic";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topicId: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    type: string; // "story" or "recap"

    @Column()
    createdAt: string;

    @ManyToOne(() => Topic, (topic) => topic.posts)
    topic?: Topic
}