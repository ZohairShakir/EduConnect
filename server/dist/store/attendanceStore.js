"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markJoin = markJoin;
exports.markLeave = markLeave;
exports.getAttendanceForSession = getAttendanceForSession;
// Key: `${sessionId}:${userId}`
const attendanceByKey = {};
const keyOf = (sessionId, userId) => `${sessionId}:${userId}`;
function markJoin(props) {
    const joinTime = props.joinTime ?? new Date();
    const k = keyOf(props.sessionId, props.userId);
    const existing = attendanceByKey[k];
    // If a user reconnects, treat it as a new join only if the previous record was closed.
    if (existing && !existing.leaveTime) {
        if (props.name)
            existing.name = props.name;
        return existing;
    }
    const record = {
        sessionId: props.sessionId,
        userId: props.userId,
        name: props.name,
        joinTime,
    };
    attendanceByKey[k] = record;
    return record;
}
function markLeave(props) {
    const k = keyOf(props.sessionId, props.userId);
    const existing = attendanceByKey[k];
    if (!existing)
        return undefined;
    if (!existing.leaveTime) {
        const leaveTime = props.leaveTime ?? new Date();
        existing.leaveTime = leaveTime;
        existing.duration = Math.max(0, Math.round((leaveTime.getTime() - existing.joinTime.getTime()) / 1000));
    }
    return existing;
}
function getAttendanceForSession(sessionId) {
    return Object.values(attendanceByKey).filter((r) => r.sessionId === sessionId);
}
