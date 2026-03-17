import React, { useCallback, useState } from "react";
import { SessionEndedOrLeftDialog } from "../dialog/SessionEndedOrLeftDialog";
import { LeaveOrEndSessionDialog } from "../dialog/LeaveOrEndSessionDialog";
import { useMeetingService } from "../../../../meeting/MeetingProvider";

interface LeaveButtonProps {
  onLeaveSession: () => void;
  onEndSession: () => void;
  isMeetingEnded: boolean;
}

export const LeaveButton = ({ onLeaveSession, onEndSession, isMeetingEnded }: LeaveButtonProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { isOrganizer } = useMeetingService();

  const handleConfirm = useCallback(() => {
    if (isOrganizer) {
      onEndSession();
    } else {
      onLeaveSession();
    }
    setIsConfirmOpen(false);
    setIsResultOpen(true);
  }, [isOrganizer, onEndSession, onLeaveSession]);

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        title={isOrganizer ? "End Session" : "Leave Session"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        aria-label={isOrganizer ? "End Session" : "Leave Session"}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12"></path>
          <line x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
      </button>

      <LeaveOrEndSessionDialog
        isOpen={isConfirmOpen}
        isOrgnizer={isOrganizer}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
      <SessionEndedOrLeftDialog 
        isMeetingEnded={isMeetingEnded} 
        isLeftMeeting={isResultOpen} 
      />
    </>
  );
};
