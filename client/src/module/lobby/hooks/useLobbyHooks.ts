import { useState } from "react";
import { useMeetingService } from "../../meeting/MeetingProvider";
import { useMember } from "../../members/MemberServiceContext";
import { useRTC } from "../../rtc/RtcProvider";
import { createSession } from "../../api/sessionsApi";

export const useLobbyHooks = () => {
  const { send } = useRTC();
  const { setMeetingId, setMeetingStatus, setIsOrganizer } = useMeetingService();
  const [nameValidationError, setNameValidationError] = useState("");
  const [name, setName] = useState("");
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const { updateMember, localSocketId } = useMember();

  const updateName = () => {
    updateMember({ memberId: localSocketId!, updatedDetails: { name } });
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
    setNameValidationError("");
  };

  const validateName = () => {
    if (!name.trim()) {
      setNameValidationError("Name cannot be empty");
      return false;
    } else {
      updateName();
      return true;
    }
  };

  const handleCreateMeeting = () => {
    if (!validateName()) {
      return;
    }
    // Meeting IDs are now server-generated sessions. We create a session first,
    // then create the socket room with that meetingId.
    if (!localSocketId) {
      setNameValidationError("Socket not connected yet. Please retry in a moment.");
      return;
    }

    createSession({ hostId: localSocketId, title: sessionTitle })
      .then((session) => {
        setMeetingId(session.id);
        setIsOrganizer(true);
        setMeetingStatus("created");
        send("create-meeting", { meetingId: session.id, name: name });
      })
      .catch((e) => {
        console.error(e);
        setNameValidationError("Failed to create session. Is the server running?");
      });
  };

  return {
    handleCreateMeeting,
    name,
    handleNameChange,
    nameValidationError,
    validateName,
    sessionTitle,
    setSessionTitle,
  };
};
