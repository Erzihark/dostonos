import prisma from "../../prisma/client.js";
import { hashPassword, comparePassword, createToken } from "../utils/auth.js";
import { Context } from "../utils/context.js";

export const resolvers = {
  Query: {
    users: async () => prisma.user.findMany(),
    me: async (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) {
        return null;
      }
      return prisma.user.findUnique({ where: { id: context.userId } });
    },
  },
  Mutation: {
    createUser: async (
      _: unknown,
      args: { name: string; email: string; password: string }
    ) => {
      const hashed = await hashPassword(args.password);
      const user = await prisma.user.create({
        data: { ...args, password: hashed },
      });
      return user;
    },
    login: async (_: unknown, args: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) throw new Error("User not found");

      const valid = await comparePassword(args.password, user.password);
      if (!valid) throw new Error("Invalid password");

      return createToken(user.id);
    },
  },
};
