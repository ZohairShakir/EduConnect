import React from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { useMediaService } from "../../media/useMediaService";
import ReactPlayer from "react-player";

export const LocalWebCamStreamContainer = () => {
  const {
    webCamStream,
    isWebCamEnabled,
    isMicEnabled,
    toggleMic,
    toggleWebCam,
  } = useMediaService();

  return (
    <div className="w-full">
      <div className="relative w-full rounded-lg overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] pt-[56.25%]">
        {isWebCamEnabled ? (
          <ReactPlayer
            url={webCamStream!}
            playing={true}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-muted)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="currentColor" />
            </svg>
          </div>
        )}

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] backdrop-blur-md transition-all duration-200 shadow-sm
              ${isMicEnabled 
                ? "bg-white/80 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white hover:border-transparent" 
                : "bg-red-50/90 border-red-200 text-red-500 hover:bg-red-100"
              }`}
            onClick={toggleMic}
            aria-label={isMicEnabled ? "Mute microphone" : "Unmute microphone"}
            title={isMicEnabled ? "Mute" : "Unmute"}
          >
            {isMicEnabled ? <FaMicrophone size={14} /> : <FaMicrophoneSlash size={14} />}
          </button>
          
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] backdrop-blur-md transition-all duration-200 shadow-sm
              ${isWebCamEnabled 
                ? "bg-white/80 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white hover:border-transparent" 
                : "bg-red-50/90 border-red-200 text-red-500 hover:bg-red-100"
              }`}
            onClick={toggleWebCam}
            aria-label={isWebCamEnabled ? "Turn off camera" : "Turn on camera"}
            title={isWebCamEnabled ? "Camera off" : "Camera on"}
          >
            {isWebCamEnabled ? <FaVideo size={14} /> : <FaVideoSlash size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};