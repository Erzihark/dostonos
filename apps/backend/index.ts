import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { gql } from "graphql-tag";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    users: async () => prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_: unknown, args: { name: string; email: string }) =>
      prisma.user.create({ data: args }),
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  await server.start();

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // GraphQL endpoint
  app.use("/graphql", expressMiddleware(server));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend ready at http://localhost:${PORT}/graphql`);
  });
}

main().catch((err) => {
  console.error("Server failed to start:", err);
});
