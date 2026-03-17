import React from "react";
import { Button } from "../../../../../components/ui/Button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  isOrgnizer: boolean;
  onConfirm: () => void;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { isOpen, isOrgnizer, onConfirm } = props;

  console.log("LeaverorendSession");

  const onClose = () => {
    console.log("close");
    window.close();
    // Fallback for browsers
    window.location.href = "/";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[var(--bg-primary)]/40 backdrop-blur-sm border-0">
      <div className="w-full max-w-sm rounded-xl bg-white border border-[var(--border-subtle)] p-6 shadow-xl text-center">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-[var(--text-primary)]">
          {isOrgnizer ? "End the session?" : "Leave the session?"}
        </h2>
        
        <p className="mb-8 text-sm text-[var(--text-secondary)]">
          {isOrgnizer
            ? "You can just leave the call if you don't want to end it for everyone else."
            : "Are you sure want to leave the session?"}
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="px-5">Cancel</Button>
          <Button 
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-5 border-none shadow-sm"
          >
            {isOrgnizer ? "End Session" : "Leave Session"}
          </Button>
        </div>
      </div>
    </div>
  );
};
