import { AuthenticationError } from 'apollo-server-errors';
import {
	signupService,
	signinService,
	SuccesResult,
	ErrorResult,
} from '../services/userAuthServices';
import { User } from '../entity/User';

// TODO: Check usage type User  shared package instae?
interface UserToRegister {
	username: string;
	password: string;
	email: string;
}

// Provide resolver functions for your schema fields
export const resolvers = {
	Query: {
		hello: () => 'Hello world!',
	},
	Mutation: {
		signUp: async (
			parent: any,
			args: UserToRegister,
		): Promise<User | undefined> => {
			const { username, password, email } = args;
			try {
				const result = await signupService(
					username,
					password,
					email,
				);
				return (result as SuccesResult).data.user;
			} catch (error) {
				throw new AuthenticationError((error as ErrorResult).err);
			}
		},
	},
};
