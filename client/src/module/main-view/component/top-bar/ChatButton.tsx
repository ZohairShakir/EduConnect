import React from "react";
import { BsChatLeftTextFill, BsChatLeftText } from "react-icons/bs";
import { PanelType } from "../../MainView";

interface ChatButtonProps {
  onIconClick: (panel: PanelType) => void;
  isChatPanelActive: boolean;
}

export const ChatButton = (props: ChatButtonProps) => {
  const { onIconClick, isChatPanelActive } = props;
  
  return (
    <button
      title="Chat Panel"
      onClick={() => onIconClick(PanelType.chat)}
      className={`p-2.5 rounded-lg transition-all duration-200 
        ${isChatPanelActive 
          ? "bg-[var(--accent-primary)] text-white shadow-sm" 
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
        }`}
      aria-label="Chat"
    >
      {isChatPanelActive ? <BsChatLeftTextFill size={18} /> : <BsChatLeftText size={18} />}
    </button>
  );
};
