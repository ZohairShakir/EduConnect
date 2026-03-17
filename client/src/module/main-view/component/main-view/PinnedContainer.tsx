import React from "react";
import {
  MediaVideoStreamType,
  DisplayVideoStreamType,
  PinnedStreamType,
} from "../../../members/types";
import { StreamContainer } from "./StreamContainer";
import { useMember } from "../../../members/MemberServiceContext";

interface PinnedContainerProps {
  pinnedStream: PinnedStreamType;
  handlePin: (pinnedStream: PinnedStreamType) => void;
}

export const PinnedContainer = (props: PinnedContainerProps) => {
  const { pinnedStream, handlePin } = props;
  const { remoteStreams } = useMember();
  const totalStreams =
    remoteStreams.video.length +
    remoteStreams.display.filter(
      (display: DisplayVideoStreamType) => display.isEnabled
    ).length;
    
  const canPinned = totalStreams > 1;
  
  const filteredVideoStreams =
    pinnedStream &&
    remoteStreams.video.filter(
      (video: MediaVideoStreamType) =>
        video.stream && pinnedStream.id !== video.stream.id
    );

  const filteredDisplayStreams =
    pinnedStream &&
    remoteStreams.display.filter(
      (display: DisplayVideoStreamType) =>
        display.stream &&
        display.isEnabled &&
        pinnedStream.id !== display.stream.id
    );

  const pinnedVideoStream =
    pinnedStream &&
    remoteStreams.video.find(
      (video: MediaVideoStreamType) =>
        video.stream &&
        video.stream.id === pinnedStream.id &&
        video.isEnabled === true
    );

  const pinnedDisplayStream =
    pinnedStream &&
    remoteStreams.display.find(
      (display: DisplayVideoStreamType) =>
        display.stream &&
        display.isEnabled === true &&
        pinnedStream.id === display.stream.id
    );

  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden">
      {/* Sidebar for non-pinned streams */}
      <div className="w-[200px] h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
        {filteredVideoStreams!.map(
          (video: MediaVideoStreamType, index: number) => (
            <div key={`side-video-${index}`} className="w-full aspect-video shrink-0">
              <StreamContainer
                stream={video}
                isWebCamStream={true}
                canPinned={canPinned}
                onPinned={handlePin}
              />
            </div>
          )
        )}
        {filteredDisplayStreams!.map(
          (display: DisplayVideoStreamType, index: number) => (
            <div key={`side-display-${index}`} className="w-full aspect-video shrink-0">
              <StreamContainer
                stream={display}
                isWebCamStream={false}
                canPinned={canPinned}
                onPinned={handlePin}
              />
            </div>
          )
        )}
      </div>

      {/* Main pinned area */}
      <div className="flex-1 h-full min-h-0">
        <StreamContainer
          stream={
            pinnedStream.videoType === "video"
              ? pinnedVideoStream!
              : pinnedDisplayStream!
          }
          isWebCamStream={pinnedStream.videoType === "video"}
          canPinned={canPinned}
          onPinned={handlePin}
        />
      </div>
    </div>
  );
};
