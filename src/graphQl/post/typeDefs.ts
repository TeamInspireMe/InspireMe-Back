import { gql } from 'apollo-server-express';
import { Section } from '../../entity/Section'
import { TypePost } from '../../entity/TypePost';

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

    type Type {
        id: Int!
        name: String!
    }

    scalar Date

    type Section {
        id: Int!
        name: String!
    }

    type Post {
        uuid: String!
        title: String!
        type: Type!
        data: String!
        section: Section!
        upVote: Int!
        downVote: Int!
        reportCount: Int!
        createdAt: Date
    }
`;