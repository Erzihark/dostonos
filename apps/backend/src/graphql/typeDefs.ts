import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String! # Returns JWT
  }
`;
