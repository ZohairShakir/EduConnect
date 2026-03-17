import React from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";

interface WebCamButtonProps {
  isWebCamEnabled: boolean;
  handleWebCamButton: () => void;
}

export const WebCamButton = (props: WebCamButtonProps) => {
  const { isWebCamEnabled, handleWebCamButton } = props;
  
  return (
    <button
      onClick={handleWebCamButton}
      title={isWebCamEnabled ? "Turn camera off" : "Turn camera on"}
      className={`
        flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 border
        ${isWebCamEnabled 
          ? "bg-white text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]" 
          : "bg-red-50 text-red-500 border-red-200 hover:bg-red-100 hover:border-red-300 shadow-sm"
        }
      `}
      aria-label={isWebCamEnabled ? "camera on" : "camera off"}
    >
      {isWebCamEnabled ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
    </button>
  );
};
