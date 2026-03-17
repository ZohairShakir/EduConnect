import React from "react";
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";

interface ScreenShareButtonProps {
  isDisplaySharing: boolean;
  handleScreenShareButton: () => void;
}

export const ScreenShareButton = (props: ScreenShareButtonProps) => {
  const { isDisplaySharing, handleScreenShareButton } = props;
  
  return (
    <button
      onClick={handleScreenShareButton}
      title={isDisplaySharing ? "Stop sharing my screen" : "Share my screen"}
      className={`
        flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 border
        ${isDisplaySharing 
          ? "bg-blue-50 text-[var(--accent-primary)] border-blue-200 hover:bg-blue-100 shadow-sm" 
          : "bg-white text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"
        }
      `}
      aria-label={isDisplaySharing ? "screen sharing on" : "screen sharing off"}
    >
      {isDisplaySharing ? <MdOutlineStopScreenShare size={22} /> : <MdOutlineScreenShare size={22} />}
    </button>
  );
};
