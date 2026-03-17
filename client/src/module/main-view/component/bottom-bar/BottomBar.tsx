import React from "react";
import { useMediaService } from "../../../media/useMediaService";
import { useMainViewAdapter } from "../../hooks/useMainViewAdapter";
import { TimeDisplay } from "./TimeDisplay";
import { SessionDuration } from "./SessionDuration";
import { LeaveButton } from "./button/LeaveButton";
import { MicrophoneButton } from "./button/MicrophoneButton";
import { WebCamButton } from "./button/WebCamButton";
import { ScreenShareButton } from "./button/ScreenShareButton";
import { RaiseDoubtButton } from "./button/RaiseDoubtButton";

export const BottomBar = () => {
  const { isMicEnabled, isWebCamEnabled, isDisplaySharing } = useMediaService();

  const {
    handleMicButton,
    handleWebCamButton,
    handleScreenShareButton,
    onleaveSession,
    onEndSession,
    isMeetingEnded,
  } = useMainViewAdapter();

  return (
    <div className="flex items-center justify-between w-full max-w-[1400px]">
      <div className="flex-1 flex justify-start pl-4">
        <div className="flex flex-col gap-1">
          <TimeDisplay />
          <SessionDuration />
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center gap-3">
        <RaiseDoubtButton />
        <MicrophoneButton
          isMicEnabled={isMicEnabled}
          handleMicButton={handleMicButton}
        />
        <WebCamButton
          isWebCamEnabled={isWebCamEnabled}
          handleWebCamButton={handleWebCamButton}
        />
        <ScreenShareButton
          isDisplaySharing={isDisplaySharing}
          handleScreenShareButton={handleScreenShareButton}
        />
        
        <div className="w-px h-8 bg-[var(--border-subtle)] mx-2" />
        
        <LeaveButton
          onLeaveSession={onleaveSession}
          onEndSession={onEndSession}
          isMeetingEnded={isMeetingEnded}
        />
      </div>

      <div className="flex-1" />
    </div>
  );
};
