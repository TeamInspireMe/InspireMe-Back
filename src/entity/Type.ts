import { Entity, Column } from "typeorm";

@Entity()
export class Type {
    @Column('integer')
    id!: Number;

    @Column('text')
    name!: String;
}