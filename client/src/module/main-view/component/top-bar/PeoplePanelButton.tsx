import React from "react";
import { BsPeopleFill, BsPeople } from "react-icons/bs";
import { PanelType } from "../../MainView";

interface PeoplePanelButtonProps {
  onIconClick: (panel: PanelType) => void;
  isPeoplePanelActive: boolean;
}

export const PeoplePanelButton = (props: PeoplePanelButtonProps) => {
  const { onIconClick, isPeoplePanelActive } = props;
  
  return (
    <button
      title="People Panel"
      onClick={() => onIconClick(PanelType.people)}
      className={`relative p-2.5 rounded-lg transition-all duration-200 
        ${isPeoplePanelActive 
          ? "bg-[var(--accent-primary)] text-white shadow-sm" 
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
        }`}
      aria-label="People"
    >
      {isPeoplePanelActive ? <BsPeopleFill size={20} /> : <BsPeople size={20} />}
      
      {!isPeoplePanelActive && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-primary)] rounded-full border-2 border-white"></span>
      )}
    </button>
  );
};
