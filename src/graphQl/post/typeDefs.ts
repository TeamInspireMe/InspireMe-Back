import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
      getOne(uuid: uuid): Post!
      getAll: array<Post>
    }
    type Mutation {
        addPost(title: String!, type: Type!, section: section!): Post!
    }
    type Post {
        uuid: String!
        title: String!
        type: Type!
        section: Section!
        like: number?
        dislike: number?
        reportCount: number?
    }
`;