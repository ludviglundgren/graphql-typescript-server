import { ResolverMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { getRepository } from "typeorm";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Helloooo ${name || "World!"}`
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const userRepo = getRepository(User);
      const user = new User();
      user.email = email;
      user.password = password;
      await userRepo.save(user);
      return true;
    }
  }
};
