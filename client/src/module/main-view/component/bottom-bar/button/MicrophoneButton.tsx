import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

interface MicrophoneButtonProps {
  isMicEnabled: boolean;
  handleMicButton: () => void;
}

export const MicrophoneButton = (props: MicrophoneButtonProps) => {
  const { isMicEnabled, handleMicButton } = props;
  
  return (
    <button
      onClick={handleMicButton}
      title={isMicEnabled ? "Turn mic off" : "Turn mic on"}
      className={`
        flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 border
        ${isMicEnabled 
          ? "bg-white text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]" 
          : "bg-red-50 text-red-500 border-red-200 hover:bg-red-100 hover:border-red-300 shadow-sm"
        }
      `}
      aria-label={isMicEnabled ? "mic on" : "mic off"}
    >
      {isMicEnabled ? <FaMicrophone size={18} /> : <FaMicrophoneSlash size={18} />}
    </button>
  );
};
