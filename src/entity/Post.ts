import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Section } from './Section';
import { Type } from '../../types';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;

    @Column()
    @IsNotEmpty()
    title!: string;

    @Column()
    type!: Type; 

    @Column()
    section!: Section; 

    @Column()
    reportCount?: Int16Array;


}