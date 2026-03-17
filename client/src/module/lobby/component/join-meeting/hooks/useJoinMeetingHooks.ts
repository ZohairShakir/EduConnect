import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMeetingService } from "../../../../meeting/MeetingProvider";
import { useMember } from "../../../../members/MemberServiceContext";
import { useRTC } from "../../../../rtc/RtcProvider";
import { useMediaService } from "../../../../media/useMediaService";

export const useJoinMeetingHooks = () => {
  const { setMeetingStatus, setJoinedAtMs } = useMeetingService();
  const { send, listen } = useRTC();
  const { members, updateStream } = useMember();
  const { webCamStream, isWebCamEnabled } = useMediaService();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<string>("");

  const joinMeetingSender = (id: string) => {
    console.log(`[join] sending join-meeting for id=${id}, name=${members[0]?.name}`);
    send("join-meeting", { meetingId: id, name: members[0]?.name });
    listen("join-meeting-response", listenJoinMeetingResponse);
  };

  const listenJoinMeetingResponse = (data: any) => {
    const { status, meetingId } = data;
    console.log(`[join] join-meeting-response: status=${status}, meetingId=${meetingId}`);

    switch (status) {
      case "invalid":
        setValidationError("Invalid meeting id");
        break;
      case "created":
        setValidationError("Meeting is created and waiting for host to start");
        setMeetingStatus("created");
        break;
      case "ended":
        setValidationError("Meeting ended!");
        setMeetingStatus("ended");
        break;
      case "started":
        setValidationError("");
        setMeetingStatus("started");
        handleMeetingStarted(data);
        break;
      default:
        break;
    }
  };

  const handleMeetingStarted = (data: any) => {
    const { meetingId, status } = data;
    updateStream({
      memberId: members[0]?.memberId,
      connectionType: "media",
      streamType: "video",
      stream: webCamStream!,
      isEnabled: isWebCamEnabled,
    });
    navigate(`/meet/${meetingId}`);
    setMeetingStatus(status);
    setJoinedAtMs(Date.now());
  };

  return {
    joinMeetingSender,
    listenJoinMeetingResponse,
    validationError,
    setValidationError,
  };
};
