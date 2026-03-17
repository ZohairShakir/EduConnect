export type UserRole = "student" | "teacher";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

const usersByEmail: Record<string, UserRecord> = {};
const usersById: Record<string, UserRecord> = {};

export function getUserByEmail(email: string): UserRecord | undefined {
  return usersByEmail[email.toLowerCase()];
}

export function getUserById(id: string): UserRecord | undefined {
  return usersById[id];
}

export function createUser(user: UserRecord): UserRecord {
  usersByEmail[user.email.toLowerCase()] = user;
  usersById[user.id] = user;
  return user;
}

