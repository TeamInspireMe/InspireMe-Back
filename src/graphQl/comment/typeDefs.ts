import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        getOneComment(uuid: String): Comment!
        getAllComment: [Comment]

    },

    type Mutation {
        createComment(postId: String!, userId:String!, content: String!): Comment!
        deleteComment(uuid: String): Boolean!
    },

    type Comment {
        uuid: String!
        content: String!
        user: User!
        post: Post!
    }
`;