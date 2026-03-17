import { useState } from "react";
import { MeetingServiceTypes, meetingStatus } from "../types";

export const useMeeting = (): MeetingServiceTypes => {
  const [meetingId, setMeetingId] = useState<string>("");
  const [meetingStatus, setMeetingStatus] =
    useState<meetingStatus>("not-created");
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [joinedAtMs, setJoinedAtMs] = useState<number | null>(null);

  return {
    meetingId,
    setMeetingId,
    meetingStatus,
    setMeetingStatus,
    isOrganizer,
    setIsOrganizer,
    joinedAtMs,
    setJoinedAtMs,
  };
};
