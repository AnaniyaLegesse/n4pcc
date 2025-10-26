import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./modules/user/user.routes";
import { schema } from "./graphql/schema";

export const createApp = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // REST routes
  app.use("/api/users", userRoutes);

  // Apollo GraphQL setup
  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));

  return app;
};
