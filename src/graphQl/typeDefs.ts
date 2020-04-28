// Construct a schema, using GraphQL schema language
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Query {
		signIn(username: String!, email: String!, password: String!): User!
		hello: String
	}
	type Mutation {
		signUp(username: String!, email: String!, password: String!): User
	}
	type User {
		uuid: String!
		username: String!
		email: String!
		password: String!
	}
`;
