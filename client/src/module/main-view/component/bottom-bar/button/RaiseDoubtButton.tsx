import React, { useState } from "react";
import { Button } from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";
import { useMember } from "../../../../members/MemberServiceContext";

export const RaiseDoubtButton: React.FC = () => {
  const { members, sendMessage } = useMember();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const onSend = () => {
    if (!text.trim()) {
      setError("Please type your doubt/question.");
      return;
    }
    setError("");
    const message = {
      memberId: members[0]?.memberId,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    sendMessage({ type: "doubt", message });
    // also persist locally immediately
    try {
      // lazy import to avoid circular deps in build graph
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { toolsStore } = require("../../../toolsStore");
      toolsStore.addDoubt(message);
    } catch {}
    setIsOpen(false);
    setText("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 px-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
      >
        Raise doubt
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[var(--text-primary)]/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-bold text-[var(--text-primary)]">
              Raise a doubt
            </div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">
              Your message will be sent to the host and appear in the Doubts panel.
            </div>

            <div className="mt-5">
              <Input
                label="Your doubt/question"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your question…"
                error={error}
                autoFocus
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSend}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

