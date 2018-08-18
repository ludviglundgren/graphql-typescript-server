import * as jwt from "jsonwebtoken";
import { ApolloError } from "../../node_modules/apollo-server-core";

export const isAuthenticated = (context: any) => {
  const token = context.token;

  if (!token) {
    console.log("Authentication failed: No token provided!");
    throw new ApolloError("Authentication failed: No auth token provided!");
  }

  const bareToken = token.replace("Bearer ", "");
  let userId;

  try {
    userId = jwt.verify(bareToken, process.env.JWT_SECRET as string);
  } catch (error) {
    console.log("Authentication failed: Token could not be verified!", error);
    throw new ApolloError(
      "Authentication failed: Token could not be verified!",
      "404"
    );
  }

  console.log("Authentication successful!");
  return userId;
};
