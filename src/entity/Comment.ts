import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;

    @Column()
    name!: String;

    @Column()
    userId!: User["uuid"];

    @Column()
    postId!: Post["uuid"];
}