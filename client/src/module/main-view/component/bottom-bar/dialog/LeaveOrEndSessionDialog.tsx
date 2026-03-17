import React from "react";
import { Button } from "../../../../../components/ui/Button";

interface LeaveOrEndSessionDialogProps {
  isOpen: boolean;
  isOrgnizer: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LeaveOrEndSessionDialog = (
  props: LeaveOrEndSessionDialogProps
) => {
  const { isOpen, isOrgnizer, onClose, onConfirm } = props;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--text-primary)]/20 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-xl bg-white border border-[var(--border-subtle)] p-6 shadow-xl animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-4">
          <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {isOrgnizer ? "End the session?" : "Leave the session?"}
          </h2>
        </div>
        
        <div className="mb-8">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {isOrgnizer
              ? "You're the organizer. Ending the session will disconnect everyone. You can also just leave if you want it to continue."
              : "Are you sure you want to leave the classroom?"}
          </p>
        </div>

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
