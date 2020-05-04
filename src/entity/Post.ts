import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Section } from './Section';
import { TypePost } from './TypePost';
import { Comment }  from './Comment';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    uuid!: String;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;

    @Column('text')
    @IsNotEmpty()
    title!: String;
    
    @ManyToOne(
        type => TypePost,
        typePost => typePost.id,
        { eager: true }
    )
    @JoinColumn()
    @IsNotEmpty()
    type!: TypePost; 

    @Column('text')
    @IsNotEmpty()
    data!: String;

    @ManyToOne(
        type => Section,
        section => section.id,
        { eager: true }
    )
    @JoinColumn({name: 'section'})
    @IsNotEmpty()
    section!: Section; 

    @Column('integer')
    reportCount: number = 0;

    @Column('integer')
    upVote: number = 0;

    @Column('integer')
    downVote: number = 0;

    @OneToMany(
        type => Comment,
        comment => comment.uuid,
        { eager: true }
    )
    @JoinColumn({name: 'Comment'})
    comments?: Comment[]
}
