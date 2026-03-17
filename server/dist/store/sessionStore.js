"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.getSessionById = getSessionById;
exports.getSessionsByHostId = getSessionsByHostId;
exports.upsertSessionParticipant = upsertSessionParticipant;
const sessionsById = {};
function createSession(session) {
    sessionsById[session.id] = session;
    return session;
}
function getSessionById(id) {
    return sessionsById[id];
}
function getSessionsByHostId(hostId) {
    return Object.values(sessionsById)
        .filter((s) => s.hostId === hostId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
function upsertSessionParticipant(sessionId, userId, name) {
    const session = sessionsById[sessionId];
    if (!session)
        return;
    const existing = session.participants.find((p) => p.userId === userId);
    if (existing) {
        if (name)
            existing.name = name;
    }
    else {
        session.participants.push({ userId, name });
    }
}
