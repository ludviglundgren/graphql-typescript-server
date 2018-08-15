import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";

export const startServer = async () => {
  const server = new ApolloServer({ schema: genSchema() as any });

  const app = express();
  server.applyMiddleware({ app });

  await createConnection();
  app.listen({ port: process.env.PORT }, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`);
  });

  return app;
};
