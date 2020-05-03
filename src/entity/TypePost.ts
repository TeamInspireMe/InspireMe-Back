import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypePost {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @Column('integer')
    id!: Number;

    @Column('text')
    name!: String;
}