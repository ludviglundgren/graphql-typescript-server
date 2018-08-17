import { ResolverMap } from "../../../types/graphql-utils";
import { getRepository } from "typeorm";
import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";

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
