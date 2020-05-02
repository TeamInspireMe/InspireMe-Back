import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Section {
    @Column('integer')
    id!: Number;

    @Column('text')
    name!: String;
}