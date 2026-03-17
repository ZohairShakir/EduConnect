import React from "react";
import {
  MediaVideoStreamType,
  DisplayVideoStreamType,
  PinnedStreamType,
} from "../../../members/types";
import { StreamPlayer } from "../stream-player/StreamPlayer";
import { useMember } from "../../../members/MemberServiceContext";

interface StreamContainerProps {
  stream: MediaVideoStreamType | DisplayVideoStreamType;
  index?: number;
  isWebCamStream: boolean;
  canPinned: boolean;
  onPinned: (pinnedStream: PinnedStreamType) => void;
}

export const StreamContainer = (props: StreamContainerProps) => {
  const { stream, index, isWebCamStream, canPinned, onPinned } = props;
  const { getMember } = useMember();
  const member = getMember(stream.memberId);
  const isLocal = member?.isLocal;

  return (
    <div
      key={`${stream.stream.id}-${stream.memberId}-${index}`}
      className={`relative w-full h-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col items-center justify-center transition-all duration-200 group
        ${stream.isEnabled && canPinned ? "cursor-pointer hover:border-[var(--accent-primary)]" : ""}`}
      onClick={() =>
        stream.isEnabled &&
        canPinned &&
        onPinned({
          videoType: isWebCamStream ? "video" : "display",
          memberId: stream.memberId,
          id: stream.stream.id,
        })
      }
    >
      <div className="absolute inset-0 z-0">
        <StreamPlayer
          stream={stream.stream}
          name={member?.name!}
          isEnabled={stream.isEnabled}
        />
      </div>

      <div className="absolute bottom-3 left-3 z-10 bg-[var(--bg-primary)]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] opacity-95 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs font-semibold text-[var(--text-primary)] tracking-wide">
          {isLocal
            ? isWebCamStream
              ? "You"
              : "You are sharing"
            : `${member?.name} ${isWebCamStream ? "" : " - Sharing"}`}
        </span>
      </div>
      
      {canPinned && stream.isEnabled && (
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-[var(--bg-primary)]/90 p-1.5 rounded-lg border border-[var(--border-subtle)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-primary)]">
              <path d="M21 10V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l2-1.14"></path>
              <path d="M16.5 9.4L7.5 4.21"></path>
              <path d="M21 16V8"></path>
              <path d="M3 12h.01"></path>
              <path d="M12 22V12"></path>
              <path d="M12 12l8.5-4.9"></path>
              <path d="M12 12l-8.5-4.9"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
