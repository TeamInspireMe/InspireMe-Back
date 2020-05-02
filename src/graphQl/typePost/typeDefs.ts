import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    getOneType(id: Int): TypePost!
    getAllType: [TypePost]!
  }

  type Mutation {
    createTypePost(id: Int!, name: String!): TypePost!
  }

  type TypePost {
    id: Int!
    name: String!
  }
`;