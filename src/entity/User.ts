import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Post } from './Post';

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - uuid
 *          - username
 *          - email
 *          - password
 *        properties:
 *          uuid: 
 *            type: uuid
 *          username:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *            format: min. 8 characters
 *        example:
 *           uuid: f48b6970-8935-11ea-bc55-0242ac130003
 *           username: Bob
 *           email: bob@gmail.com
 *           password: bob1uduzagd
 *      ResponseUserRegistered:
 *        example:
 *           data:
 *            user:
 *              uuid: 4c2d544a-803f-4668-b4ed-410a1f
 *              username: Bob
 *              email: bob@gmail.com
 *              password: bob1
 *           meta:
 *            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjMmQ1NDRhLTgwM2YtNDY2OC1iNGVkLTQxMGExZjQwZTU4NSIsIm5pY2tuYW1lIjoiZGVsZXRlMjIiLCJ
 *      ResponseArrayOfUsers:
 *        type: array
 *        example:
 *          - uuid: 4c2d544a-803f-4668-b4ed-410a1f
 *            username: Bob1
 *            email: bob1@gmail.com
 *            password: bob1
 *          - uuid: 4c2d544a-803f-4668-b4ed-410a1f
 *            username: Bob2
 *            email: bob2@gmail.com
 *            password: bob2
 *      ResponseUserSingle:
 *        example:
 *          uuid: 4c2d544a-803f-4668-b4ed-410a1f
 *          username: Bob1
 *          email: bob1@gmail.com
 *          password: bob1
 *      ResponseUserWithAvatar:
 *        example:
 *          user:
 *            uuid: 4c2d544a-803f-4668-b4ed-410a1f
 *            username: Bob1
 *            email: bob1@gmail.com
 *            password: bob1
 *      ResponseUserDeleted:
 *        example:
 *          username: Bob1
 *          email: bob1@gmail.com
 *          password: bob1
 *      RequestBodyUserUpdateAvatar:
 *        example:
 *          uuid: 4c2d544a-803f-4668-b4ed-410a1f
 *          file: FILE
 */

@Entity()
@Unique(['username'])
export class User {
	@PrimaryGeneratedColumn('uuid')
	uuid!: string;

	@CreateDateColumn({type: "timestamp"})
    createdAt!: Date;

	@Column('text') 
	@IsNotEmpty()
	username!: string;

	@Column('text')
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@Column('text')
	@Length(8, 20)
	@IsNotEmpty()
	password!: string;

	@ManyToOne(
		type => Post,
		post => post.uuid,
		{ eager: true }
		)
	@JoinColumn({name: 'postId'})
	postId?: Post;

	hashPassword(): void {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}
}
