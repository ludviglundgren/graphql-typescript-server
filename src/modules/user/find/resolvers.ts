import { ResolverMap } from "../../../types/graphql-utils";
import { getRepository } from "typeorm";
import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";
import { isAuthenticated } from "../../../utils/isAuth";

export const resolvers: ResolverMap = {
  Query: {
    users: async (_, __, context) => {
      const userId = isAuthenticated(context);

      if (!userId) {
        return null;
      }

      const userRepo = getRepository(User);
      const users = await userRepo.find();
      return users;
    },
    user: async (_, { id }) => {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { id } });
      return user;
    },
    me: async (_, __, context) => {
      const userId = isAuthenticated(context);

      if (!userId) {
        return null;
      }

      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { userId } });
      return user;
    }
  },
  User: {
    async posts(obj) {
      console.log(obj);
      const postRepo = getRepository(Post);
      const posts: any = await postRepo.find({
        where: { userId: obj.id }
      });

      return posts;
    }
  }
};
