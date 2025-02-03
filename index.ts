import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

// import { typeDefs } from "./typeDefs";
import resolvers from "./resolvers/index.resolvers";
import typeDefs from "./typeDefs/index.typeDefs";
import { requireAuth } from "./middlewares/auth.middleware";

const app: Express = express();

dotenv.config();

const port: number | string = process.env.PORT || 3000;

const startSever = async () => {
  database.connect();

  // GraphQL
  app.use("/graphql", requireAuth);

  const apolloSever = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: ({ req }) => {
      return { ...req };
    },
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
