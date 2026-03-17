import React, { useState } from "react";
import { useMeetingService } from "../../../meeting/MeetingProvider";
import { joinMeetingUtils } from "./utils/joinMeetingUtils";
import { useJoinMeetingHooks } from "./hooks/useJoinMeetingHooks";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";

interface JoinMeetingProps {
  validateName: () => boolean;
}

export const JoinMeeting: React.FC<JoinMeetingProps> = ({ validateName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setMeetingId } = useMeetingService();
  const [textMeetingId, setTextMeetingId] = useState("");
  const { handlemeetingIdChange, validatemeetingId } = joinMeetingUtils();
  const { joinMeetingSender, validationError, setValidationError } = useJoinMeetingHooks();

  const openDialog = () => {
    if (!validateName()) return;
    setIsOpen(true);
  };

  const onChange = (event: any) => {
    setValidationError("");
    const id = handlemeetingIdChange(event);
    setTextMeetingId(id);
  };

  const handleJoin = () => {
    if (!validatemeetingId(textMeetingId)) {
      setValidationError("Invalid Meeting ID");
      return;
    }
    setValidationError("");
    const meetingId = textMeetingId.replaceAll("-", "").toUpperCase();
    setMeetingId(meetingId);
    joinMeetingSender(meetingId);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTextMeetingId("");
    setValidationError("");
  };

  return (
    <>
      <Button variant="ghost" onClick={openDialog}>
        {/* ensure clickable even if something overlaps */}
        <svg className="mr-2" width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Join Session
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--text-primary)]/20 backdrop-blur-sm transition-opacity" onClick={handleClose}>
          <div className="w-full max-w-sm rounded-[14px] bg-[var(--card-bg)] border border-[var(--border-subtle)] p-6 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">Join a Session</h2>
              <button className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors" onClick={handleClose} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="mb-8">
              <Input
                label="Meeting ID"
                maxLength={9}
                id="meeting-id"
                placeholder="e.g., ABCD-EFGH"
                value={textMeetingId}
                onChange={onChange}
                error={validationError}
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleJoin}>Join</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
