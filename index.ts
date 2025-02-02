import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const app: Express = express();

dotenv.config();

const port: number | string = process.env.PORT || 3000;

const startSever = async () => {
  database.connect();

  // GraphQL

  const apolloSever = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloSever.start();

  apolloSever.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  app.listen(port, (): void => {
    return console.log(`Server is listening on ${port}`);
  });
};

startSever();
