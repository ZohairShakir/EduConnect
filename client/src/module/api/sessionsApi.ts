import { API_HOST } from "./config";

export type SessionDto = {
  id: string;
  hostId: string;
  title: string;
  createdAt: string;
  participants: Array<{ userId: string; name?: string }>;
};

export async function createSession(props: {
  hostId: string;
  title?: string;
}): Promise<SessionDto> {
  const res = await fetch(`${API_HOST}/sessions/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  });
  if (!res.ok) throw new Error(`Failed to create session (${res.status})`);
  const data = await res.json();
  return data.session as SessionDto;
}

export async function getSessionsByHost(hostId: string): Promise<SessionDto[]> {
  const res = await fetch(`${API_HOST}/sessions/host/${encodeURIComponent(hostId)}`);
  if (!res.ok) throw new Error(`Failed to fetch sessions (${res.status})`);
  const data = await res.json();
  return (data.sessions ?? []) as SessionDto[];
}

