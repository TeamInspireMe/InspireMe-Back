import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Section {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @Column('integer')
    id!: Number;

    @Column('text')
    name!: String;
}