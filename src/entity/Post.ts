import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Section } from './Section';
import { Type } from '../../types';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;

    @Column()
    @IsNotEmpty()
    title!: String;

    @Column()
    @IsNotEmpty()
    type!: Type; 

    @Column()
    @IsNotEmpty()
    section!: Section; 

    @Column()
    reportCount?: number = 0;

    @Column()
    like?: number = 0;

    @Column()
    dislike?: number = 0;
}
