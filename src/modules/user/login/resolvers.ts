import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { invalidLogin } from "./errorMessages";
import { getRepository } from "typeorm";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: any) => {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        return errorResponse;
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return errorResponse;
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
