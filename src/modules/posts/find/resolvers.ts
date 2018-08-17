import { ResolverMap } from "../../../types/graphql-utils";
import { getRepository } from "typeorm";
import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Query: {
    posts: async () => {
      const postRepo = getRepository(Post);
      const posts = await postRepo.find();
      return posts;
    },
    post: async (_, { id }) => {
      const postRepo = getRepository(Post);
      const post = await postRepo.findOne({ where: { id } });

      return post;
    }
  },
  Post: {
    async user(obj) {
      /**
       * Load relations from post side
       *
       * const postRepo = getRepository(Post);
       * const user: any = await postRepo.findOne({
       *   where: { id: obj.id },
       *   relations: ["user"]
       * });
       */

      // Load user from userId on many-to-one relation on post
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({
        where: { id: obj.userId }
      });

      return user;
    }
  }
};
