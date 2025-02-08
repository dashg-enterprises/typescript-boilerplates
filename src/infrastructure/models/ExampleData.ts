import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("example")
export class ExampleData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({nullable: true})
    quantity?: number;
}