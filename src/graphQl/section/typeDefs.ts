import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        getOneSection(id: Int): Section!
        getAllSection: [Section]!
    }

    type Mutation {
        createSection(id: Int!, name: String!): Section!
    }

    type Section {
        id: Int!
        name: String!
        posts: [Post]
    }
`;