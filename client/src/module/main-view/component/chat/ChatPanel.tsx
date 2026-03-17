import React, { useEffect, useRef } from "react";
import { ChatMessages } from "./ChatMessages";
import { ChatInputBox } from "./ChatInputBox";
import { useMember } from "../../../members/MemberServiceContext";
import { useMeetingService } from "../../../meeting/MeetingProvider";

export const ChatPanel = () => {
  const { chatMessage, getMember } = useMember();
  const { isOrganizer } = useMeetingService();
  const lastSeenMessageCountRef = useRef<number>(chatMessage.length);

  useEffect(() => {
    // Only notify the host/organizer about new messages coming from other users.
    if (!isOrganizer) {
      lastSeenMessageCountRef.current = chatMessage.length;
      return;
    }

    if (chatMessage.length <= lastSeenMessageCountRef.current) return;

    const newest = chatMessage[chatMessage.length - 1];
    const sender = newest ? getMember(newest.memberId) : undefined;

    // We can use a custom toast if needed, but for now we focus on the panel itself
    // Or just use the native Notification API if permitted
    console.log(`New chat message from ${sender?.name ?? "A participant"}: ${newest.textMessage}`);

    lastSeenMessageCountRef.current = chatMessage.length;
  }, [chatMessage, getMember, isOrganizer]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-hidden relative">
        <ChatMessages messages={chatMessage} getMember={getMember} />
      </div>
      <div className="p-4 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
        <ChatInputBox />
      </div>
    </div>
  );
};
