import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Section } from './Section';
import { TypePost } from './TypePost';

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
    type!: TypePost; 

    @Column('text')
    @IsNotEmpty()
    data!: String;

    @Column('text')
    @IsNotEmpty()
    section!: Section; 

    @Column('integer')
    reportCount?: Number;

    @Column('integer')
    upVote?: Number = 0;

    @Column('integer')
    downVote?: Number = 0;
}
