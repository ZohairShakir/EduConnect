export interface AttendanceRecord {
  userId: string;
  sessionId: string;
  joinTime: Date;
  leaveTime?: Date;
  duration?: number; // seconds
  name?: string;
}

