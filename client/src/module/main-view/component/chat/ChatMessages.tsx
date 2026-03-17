import React from "react";
import { ChatMessage } from "./Types";
import { Member } from "../../../members/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  getMember: (memberId: string) => Member | undefined;
}

export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages, getMember } = props;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] opacity-50">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
          </svg>
          <p className="text-sm">No messages yet.</p>
        </div>
      ) : (
        messages.map((message: ChatMessage, index: number) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] ${
              getMember(message.memberId)?.isLocal ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tight">
                {getMember(message.memberId)?.isLocal ? "You" : getMember(message.memberId)?.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] opacity-70">
                {message.time}
              </span>
            </div>
            <div
              className={`px-3 py-2 rounded-2xl text-sm shadow-sm border ${
                getMember(message.memberId)?.isLocal
                  ? "bg-[var(--accent-primary)] text-white border-transparent rounded-tr-none"
                  : "bg-white text-[var(--text-primary)] border-[var(--border-subtle)] rounded-tl-none"
              }`}
            >
              {message.textMessage}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
