import React from "react";
import { PanelType } from "../../MainView";
import { ChatPanel } from "../chat/ChatPanel";
import { PeoplePanel } from "../people-panel/PeoplePanel";
import { DoubtsPanel } from "../tools/DoubtsPanel";
import { WhiteboardPanel } from "../tools/WhiteboardPanel";
import { NotesPanel } from "../tools/NotesPanel";

interface DrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activePanel: PanelType;
}

export const DrawerPanel = (props: DrawerPanelProps) => {
  const { isOpen, onClose, activePanel } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed top-14 right-4 bottom-4 w-[350px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] z-50 rounded-xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          {activePanel === PanelType.people ? "People" : "Chat"}
        </h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="12"></line>
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-[var(--bg-secondary)]">
        {activePanel === PanelType.people && <PeoplePanel />}
        {activePanel === PanelType.chat && <ChatPanel />}
        {activePanel === PanelType.doubts && <DoubtsPanel />}
        {activePanel === PanelType.whiteboard && <WhiteboardPanel />}
        {activePanel === PanelType.notes && <NotesPanel />}
      </div>
    </div>
  );
};
