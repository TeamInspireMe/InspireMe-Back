import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        getOneComment(uuid: String): Comment!
        getAllComment: [Comment]

    },

    type Mutation {
        createComment(id: Int!, content: String!): Comment!
        deleteComment(uuid: String): Boolean!
    },

    type Comment {
        id: Int!
        content: String!
        user: User!
        post: Post!
    }
`;