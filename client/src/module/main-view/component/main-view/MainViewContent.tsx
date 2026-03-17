import React, { useCallback, useState } from "react";
import { useMember } from "../../../members/MemberServiceContext";
import { PinnedStreamType } from "../../../members/types";
import AudioPlayers from "../audio-element/AudioPlayer";
import { PinnedContainer } from "./PinnedContainer";
import { NormalGridView } from "./NormalGridView";

export const MainViewContent: React.FC = () => {
  const { remoteStreams } = useMember();
  const [pinnedStream, setPinnedStream] = useState<PinnedStreamType | null>();

  const handlePin = useCallback(
    (pinStream: PinnedStreamType) => {
      if (pinStream.id === pinnedStream?.id) {
        setPinnedStream(null);
      } else {
        setPinnedStream(pinStream);
      }
    },
    [pinnedStream?.id]
  );

  const totalStreams =
    remoteStreams.video.length +
    remoteStreams.display.filter((d) => d.isEnabled).length;

  const isPinned =
    pinnedStream &&
    totalStreams > 1 &&
    (remoteStreams.video.find(
      (video) => video.stream && pinnedStream.id === video.stream.id
    )?.isEnabled ||
      remoteStreams.display.find(
        (display) => display.stream && pinnedStream.id === display.stream.id
      )?.isEnabled);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden">
      <AudioPlayers audioStreams={remoteStreams.audio} />
      <div className="flex-1 w-full max-w-[1400px] h-full flex items-center justify-center">
        {isPinned && pinnedStream ? (
          <PinnedContainer pinnedStream={pinnedStream} handlePin={handlePin} />
        ) : (
          <NormalGridView handlePin={handlePin} />
        )}
      </div>
    </div>
  );
};
