import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
      getOnePost(uuid: String): Post!
      getAllPost: [Post]
    }

    type Mutation {
        createPost(title: String!, type: String!, section: String!, data: String!): Post!
        upVotePost(uuid: String!): Post!
        downVotePost(uuid: String!): Post!
    }

    scalar Date

    type Post {
        uuid: String!
        title: String!
        type: TypePost!
        data: String!
        section: Section!
        upVote: Int!
        downVote: Int!
        reportCount: Int!
        createdAt: Date
    }
`;