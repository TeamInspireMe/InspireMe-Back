import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
      getOne(uuid: uuid): Post!
      getAll: [Post]
    }
    type Mutation {
        createPost(title: String!, type: Type!, section: section!, data: String!): Post!
        upVotePost(uuid: String!): Post!
        downVotePost(uuid: String!): Post!
    }
    type Post {
        uuid: String!
        title: String!
        type: Type!
        data: String!
        section: Section!
        upVote: number!
        downVote: number!
        reportCount: number!
    }
`;