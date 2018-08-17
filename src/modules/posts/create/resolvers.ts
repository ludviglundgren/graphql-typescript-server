import { ResolverMap } from "../../../types/graphql-utils";
// import { GQL } from "../../../types/schema";
import { getRepository } from "typeorm";
// import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Mutation: {
    createPost: async (_, { input: { title, content, userId } }) => {
      const postRepo = getRepository(Post);
      const post = new Post();
      post.title = title;
      post.content = content;
      post.user = userId;

      const result = await postRepo.save(post);
      return result;
    }
  }
};
