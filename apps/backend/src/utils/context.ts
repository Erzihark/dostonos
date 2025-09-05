import { Request } from "express";
import { verifyToken } from "./auth";

export interface Context {
  userId?: number;
}

export const createContext = ({ req }: { req: Request }): Promise<Context> => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  const verified = token ? verifyToken(token) : null;

  const context: Context = { userId: verified?.userId };
  return Promise.resolve(context);
};
