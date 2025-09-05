import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { createContext } from "./utils/context.js";
// Define GraphQL schema

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
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: createContext,
    })
  );

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend ready at http://localhost:${PORT}/graphql`);
  });
}

main().catch((err) => {
  console.error("Server failed to start:", err);
});
