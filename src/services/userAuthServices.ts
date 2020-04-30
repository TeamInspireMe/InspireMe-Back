/* eslint-disable @typescript-eslint/no-use-before-define */ // TOD -> à mettre en global
// import fs from 'fs';
// import path from 'path';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
// import { getRepository, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import passport from 'passport';
import { User } from '../entity/User';
import { SendMail, Mail } from './mailGunService';
import { addUserRepository } from '../repositories/userRepository';

interface BaseResult {
	status: number;
}

export interface SuccessResult extends BaseResult {
	data: {
		user: User;
	};
	meta: {
		token: string;
	};
}

export interface ErrorResult extends BaseResult {
	err: any;
}

type Result = SuccessResult | ErrorResult;

// TODO: use type User in params ???
export const signupService = async (
	username: string,
	password: string,
	email: string,
): Promise<Result> => {
	const user: User = new User();
	user.username = username;
	user.password = password;
	user.email = email;

	let res: SuccessResult;
	let err: ErrorResult;

	const errors: ValidationError[] = await validate(user);

	if (errors.length > 0) {
		err = {
			status: 400,
			err: errors,
		};
	}

	user.hashPassword();

	try {
		const insertedUser = await addUserRepository(user);
		console.log('User created');
		console.log(insertedUser);
		const data: Mail = {
			from: 'InspireMe Team <teams@InspireMe.org>',
			to: insertedUser.email,
			subject: 'Subscription',
			text: `Congratulations ${insertedUser.username}, you are now registered to InspireMe!`,
		};

		SendMail(data);

		const token: string = setToken(insertedUser);

		res = {
			status: 201,
			data: { user: insertedUser },
			meta: { token },
		};
	} catch (error) {
		err = {
			status: 400,
			err: error.message,
		};
	}

	return new Promise(
		(
			resolve: (result: SuccessResult) => void,
			reject: (result: ErrorResult) => void,
		) => {
			if (err) reject(err);
			else {
				resolve(res);
			}
		},
	);
};

export const signinService = async (
	req: Request,
	res: Response,
): Promise<Result> => {
	return new Promise(
		(
			resolve: (result: SuccessResult) => void,
			reject: (result: ErrorResult) => void,
		) => {
			passport.authenticate(
				'local',
				{ session: false },
				async (error, user) => {
					if (!error) {
						console.log('SIGNED IN!');
						const token: string = setToken(user);
						resolve({
							status: 201,
							data: { user },
							meta: { token },
						});
					} else {
						reject({
							status: 400,
							err: error.message,
						});
					}
				},
			)(req, res);
		},
	);
};

export const setToken = (user: User): string => {
	const { uuid, username, email } = user;
	const payload = { uuid, username, email };
	const token: string = jwt.sign(payload, process.env.SECRET as string);
	return token;
};
