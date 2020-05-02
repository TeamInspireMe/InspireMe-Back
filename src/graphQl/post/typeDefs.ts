import { gql } from 'apollo-server-express';
import { Section } from '../../entity/Section'
import { Type } from '../../entity/Type';

export const typeDefs = gql`
    type Query {
      getOne(uuid: String): Post!
      getAll: [Post]
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
        uuid: String!
        createdAt: Date!
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