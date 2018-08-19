import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { invalidLogin } from "./errorMessages";
import { getRepository } from "typeorm";
import { AuthenticationError } from "../../../../node_modules/apollo-server-core";

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: any) => {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        throw new AuthenticationError(invalidLogin);
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new AuthenticationError(invalidLogin);
      }

      let token;
      if (valid) {
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
          expiresIn: 86400
        });
      }

      return {
        authenticated: true,
        token,
        user
      };
    }
  }
};
