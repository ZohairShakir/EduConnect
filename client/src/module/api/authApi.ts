import { API_HOST } from "./config";

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
};

export async function signup(props: {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}): Promise<{ token: string; user: UserDto }> {
  const res = await fetch(`${API_HOST}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Signup failed");
  return data as { token: string; user: UserDto };
}

export async function login(props: {
  email: string;
  password: string;
}): Promise<{ token: string; user: UserDto }> {
  const res = await fetch(`${API_HOST}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Login failed");
  return data as { token: string; user: UserDto };
}

