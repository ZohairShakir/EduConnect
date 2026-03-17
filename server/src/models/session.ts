export interface Session {
  id: string; // meetingId
  hostId: string;
  title: string;
  createdAt: Date;
  participants: Array<{ userId: string; name?: string }>;
}

export type CreateSessionRequest = {
  hostId: string;
  title?: string;
};

