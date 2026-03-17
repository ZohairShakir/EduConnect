import React from "react";
import { Button } from "../../../../../components/ui/Button";

interface SessionEndedOrLeftDialogProps {
  isMeetingEnded: boolean;
  isLeftMeeting: boolean;
}

export const SessionEndedOrLeftDialog = (
  props: SessionEndedOrLeftDialogProps
) => {
  const { isMeetingEnded, isLeftMeeting } = props;

  const onClose = () => {
    window.close();
    // Fallback for browsers that don't allow window.close()
    window.location.href = "/app";
  };

  if (!isMeetingEnded && !isLeftMeeting) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[var(--bg-primary)] px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--accent-primary)] border border-[var(--border-subtle)] shadow-inner">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {isMeetingEnded
            ? "Session has been ended."
            : "You have left the session."}
        </h1>
        
        <p className="mb-10 text-[var(--text-secondary)]">
          You can safely close this tab or return to the dashboard.
        </p>

        <Button onClick={onClose} className="px-8 !py-3 font-semibold shadow-md">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
