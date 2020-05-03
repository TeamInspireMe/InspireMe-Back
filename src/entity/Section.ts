import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from './Post'

@Entity()
export class Section {
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