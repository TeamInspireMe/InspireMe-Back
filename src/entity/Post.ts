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

    @Column('text')
    @IsNotEmpty()
    title!: String;
    
    @Column('text')
    @IsNotEmpty()
    type!: Type; 

    @Column('text')
    @IsNotEmpty()
    data!: String;

    @Column('text')
    @IsNotEmpty()
    section!: Section; 

    @Column()
    reportCount?: number = 0;

    @Column()
    upVote?: number = 0;

    @Column()
    downVote?: number = 0;
}
