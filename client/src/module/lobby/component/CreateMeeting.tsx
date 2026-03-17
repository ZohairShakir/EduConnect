import React from "react";

interface CreateMeetingProps {
  onClick: () => void;
}

// Kept for backwards-compatibility. Lobby now renders inline action buttons.
export const CreateMeeting: React.FC<CreateMeetingProps> = ({ onClick }) => {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 16px",
        background: "var(--accent-primary)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseOver={e => ((e.target as HTMLElement).style.background = "var(--accent-hover)")}
      onMouseOut={e => ((e.target as HTMLElement).style.background = "var(--accent-primary)")}
      onClick={onClick}
    >
      Create Session
    </button>
  );
};
