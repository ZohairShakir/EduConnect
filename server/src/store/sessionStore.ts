import { Session } from "../models/session";

const sessionsById: Record<string, Session> = {};

export function createSession(session: Session): Session {
  sessionsById[session.id] = session;
  return session;
}

export function getSessionById(id: string): Session | undefined {
  return sessionsById[id];
}

export function getSessionsByHostId(hostId: string): Session[] {
  return Object.values(sessionsById)
    .filter((s) => s.hostId === hostId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function upsertSessionParticipant(
  sessionId: string,
  userId: string,
  name?: string
): void {
  const session = sessionsById[sessionId];
  if (!session) return;

  const existing = session.participants.find((p) => p.userId === userId);
  if (existing) {
    if (name) existing.name = name;
  } else {
    session.participants.push({ userId, name });
  }
}

