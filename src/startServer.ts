import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";

export const startServer = async () => {
  const server = new GraphQLServer({ schema: genSchema() as any });

  await createConnection();
  const app = await server.start({
    port: process.env.PORT
  });
  console.log(`Server is running on localhost:${process.env.PORT}`);

  return app;
};
