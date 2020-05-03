import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from './Post'

@Entity()
export class TypePost {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @Column('integer')
    id!: Number;

    @Column('text')
    name!: String;

    @OneToMany(
        type => Post,
        post => post.type
    )
    posts?: Post[]
}