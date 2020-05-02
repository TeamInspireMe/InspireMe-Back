import { Entity, Column } from "typeorm";

@Entity()
export class TypePost {
    @Column('integer')
    id!: Number;

    @Column('text')
    name!: String;
}