import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import {
  invalidLogin
  // confirmEmailError,
  // forgotPasswordLockedError
} from "./errorMessages";
import { getRepository } from "../../../../node_modules/typeorm";

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

      // if (!user.confirmed) {
      //   return [
      //     {
      //       path: "email",
      //       message: confirmEmailError
      //     }
      //   ];
      // }

      // if (user.forgotPasswordLocked) {
      //   return [
      //     {
      //       path: "email",
      //       message: forgotPasswordLockedError
      //     }
      //   ];
      // }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return errorResponse;
      }

      // login sucessful
      // session.userId = user.id;
      // if (req.sessionID) {
      //   await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      // }
      let token;
      if (valid) {
        console.log("i am valid");
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
          expiresIn: 86400
        });
      }

      console.log(token);
      return {
        authenticated: true,
        token,
        user
      };
    }
  }
};
