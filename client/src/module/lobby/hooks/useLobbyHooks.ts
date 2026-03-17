import { useEffect, useState } from "react";
import { useMeetingService } from "../../meeting/MeetingProvider";
import { useMember } from "../../members/MemberServiceContext";
import { useRTC } from "../../rtc/RtcProvider";
import { createSession } from "../../api/sessionsApi";
import { useAuth } from "../../auth/AuthContext";

export const useLobbyHooks = () => {
  const { user } = useAuth();
  const { send } = useRTC();
  const { setMeetingId, setMeetingStatus, setIsOrganizer } = useMeetingService();
  const [nameValidationError, setNameValidationError] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const { updateMember, localSocketId, members } = useMember();

  const updateName = () => {
    // Update the *actual local member record* (more reliable than localSocketId timing).
    const localMemberId = members[0]?.memberId || localSocketId;
    if (!localMemberId) return;
    updateMember({ memberId: localMemberId, updatedDetails: { name } });
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
    setNameValidationError("");
  };

  // Keep lobby name in sync with logged-in profile (and with local member record)
  useEffect(() => {
    if (!user?.name) return;
    setName((prev) => (prev?.trim() ? prev : user.name));
  }, [user?.name]);

  useEffect(() => {
    if (!name.trim()) return;
    updateName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members?.[0]?.memberId]);

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
