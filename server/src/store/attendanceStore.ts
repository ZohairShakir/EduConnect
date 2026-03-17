import { AttendanceRecord } from "../models/attendance";

// Key: `${sessionId}:${userId}`
const attendanceByKey: Record<string, AttendanceRecord> = {};

const keyOf = (sessionId: string, userId: string) => `${sessionId}:${userId}`;

export function markJoin(props: {
  sessionId: string;
  userId: string;
  name?: string;
  joinTime?: Date;
}): AttendanceRecord {
  const joinTime = props.joinTime ?? new Date();
  const k = keyOf(props.sessionId, props.userId);
  const existing = attendanceByKey[k];

  // If a user reconnects, treat it as a new join only if the previous record was closed.
  if (existing && !existing.leaveTime) {
    if (props.name) existing.name = props.name;
    return existing;
  }

  const record: AttendanceRecord = {
    sessionId: props.sessionId,
    userId: props.userId,
    name: props.name,
    joinTime,
  };
  attendanceByKey[k] = record;
  return record;
}

export function markLeave(props: {
  sessionId: string;
  userId: string;
  leaveTime?: Date;
}): AttendanceRecord | undefined {
  const k = keyOf(props.sessionId, props.userId);
  const existing = attendanceByKey[k];
  if (!existing) return undefined;

  if (!existing.leaveTime) {
    const leaveTime = props.leaveTime ?? new Date();
    existing.leaveTime = leaveTime;
    existing.duration = Math.max(
      0,
      Math.round((leaveTime.getTime() - existing.joinTime.getTime()) / 1000)
    );
  }

  return existing;
}

export function getAttendanceForSession(sessionId: string): AttendanceRecord[] {
  return Object.values(attendanceByKey).filter((r) => r.sessionId === sessionId);
}

