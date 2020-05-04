import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;

    @Column('text')
    @IsNotEmpty()
    content!: String;

    @ManyToOne(
        type => User,
        user => user.uuid,
        { eager: true }
    )
    user!: User;

    @ManyToOne(
        type => Post,
        post => post.uuid,
        { eager: true }
    )
    post!: Post;
} 