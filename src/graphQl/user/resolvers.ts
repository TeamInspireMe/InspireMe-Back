import { AuthenticationError } from 'apollo-server-errors';
import {
	signupService,
	SuccessResult,
	ErrorResult,
} from '../../services/userAuthServices';
import { User } from '../../entity/User';
import { UserToRegister } from '../../../types'; 

// Provide resolver functions for your schema fields
export const resolvers = {
	Query: {
		helloo: () => 'Hello world!',
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
	
				return (result as SuccessResult).data.user;
			} catch (error) {
				throw new AuthenticationError((error as ErrorResult).err);
			}
		},
	},
};
