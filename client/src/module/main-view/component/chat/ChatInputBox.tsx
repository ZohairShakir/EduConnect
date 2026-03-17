import React, { useState } from "react";
import { ChatMessage } from "./Types";
import { useChatMessage } from "./useChatMessage";
import { useMember } from "../../../members/MemberServiceContext";

export const ChatInputBox = () => {
  const [newMessage, setNewMessage] = useState("");
  const { sendChatMessage } = useChatMessage();
  const { members } = useMember();

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessage = {
      memberId: members[0].memberId,
      textMessage: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    sendChatMessage(newChatMessage);
    setNewMessage("");
  };

  return (
    <div className="relative">
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleMessageSend();
          }
        }}
        placeholder="Type a message..."
        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:bg-white transition-all resize-none min-h-[44px] max-h-[120px] shadow-inner"
        rows={1}
      />
      <button
        onClick={handleMessageSend}
        disabled={!newMessage.trim()}
        className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-all duration-200 
          ${newMessage.trim() 
            ? "text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10" 
            : "text-[var(--text-muted)] opacity-50 cursor-not-allowed"
          }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polyline points="22 2 15 22 11 13 2 9 22 2"></polyline>
        </svg>
      </button>
    </div>
  );
};
