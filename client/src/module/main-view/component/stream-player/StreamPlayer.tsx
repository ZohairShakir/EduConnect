import React from "react";
import ReactPlayer from "react-player";

interface StreamPlayerProps {
  stream: MediaStream;
  name: string;
  isEnabled: boolean;
}

export const StreamPlayer = (props: StreamPlayerProps) => {
  const { stream, name, isEnabled } = props;

  return isEnabled ? (
    <div className="relative w-full h-full flex justify-center items-center bg-black">
      <ReactPlayer
        url={stream!}
        playing={true}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  ) : (
    <div className="flex aspect-video w-full h-full items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-muted)]">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-primary)] text-white text-2xl font-bold shadow-sm">
        {name ? name.slice(0, 2).toUpperCase() : "?"}
      </div>
    </div>
  );
};
