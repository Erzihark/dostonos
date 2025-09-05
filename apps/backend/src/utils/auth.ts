import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Compare password
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Create JWT token
export const createToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
};
