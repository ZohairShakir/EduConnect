import React from "react";
import { StreamContainer } from "./StreamContainer";
import {
  DisplayVideoStreamType,
  MediaVideoStreamType,
} from "../../../members/types";
import { useMember } from "../../../members/MemberServiceContext";

interface NormalGridViewProps {
  handlePin: (pinnedStream: any) => void;
}

export const NormalGridView = (props: NormalGridViewProps) => {
  const { handlePin } = props;
  const { remoteStreams } = useMember();

  const totalStreams =
    remoteStreams.video.length +
    remoteStreams.display.filter(
      (display: DisplayVideoStreamType) => display.isEnabled
    ).length;
    
  const canPinned = totalStreams > 1;
  const columns: number = Math.ceil(Math.sqrt(totalStreams));
  const gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div 
      className="grid gap-4 w-full h-full max-h-full overflow-y-auto p-4 content-center justify-items-center"
      style={{ gridTemplateColumns }}
    >
      {remoteStreams.video.map((video: MediaVideoStreamType, index: number) => (
        <div key={`video-${video.stream.id}-${index}`} className="w-full h-full aspect-video max-w-[800px]">
          <StreamContainer
            stream={video}
            index={index}
            isWebCamStream={true}
            canPinned={canPinned}
            onPinned={handlePin}
          />
        </div>
      ))}
      {remoteStreams.display
        .filter((display: DisplayVideoStreamType) => display.isEnabled)
        .map((display: DisplayVideoStreamType, index: number) => (
          <div key={`display-${display.stream.id}-${index}`} className="w-full h-full aspect-video max-w-[800px]">
            <StreamContainer
              stream={display}
              index={index}
              isWebCamStream={false}
              canPinned={canPinned}
              onPinned={handlePin}
            />
          </div>
        ))}
    </div>
  );
};
