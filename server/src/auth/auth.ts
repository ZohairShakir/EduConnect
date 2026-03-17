import jwt from "jsonwebtoken";

export type JwtUser = {
  sub: string;
  email: string;
  role: string;
  name: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export function signUserToken(user: JwtUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtUser {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
}

