import { ResolverMap } from "../../../types/graphql-utils";
import { getRepository } from "typeorm";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    users: async () => {
      const userRepo = getRepository(User);
      const users = await userRepo.find();
      return users;
    },
    user: async (_, { id }) => {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { id } });
      return user;
    }
  }
};
