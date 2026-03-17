import React, { useEffect, useRef, useState } from "react";
import { InfoDialog } from "./InfoDialog";
import { PanelType } from "../../MainView";
import { ChatButton } from "./ChatButton";
import { PeoplePanelButton } from "./PeoplePanelButton";
import { Button } from "../../../../components/ui/Button";
import { toolsStore } from "../../toolsStore";
import { useMeetingService } from "../../../meeting/MeetingProvider";
import { useMember } from "../../../members/MemberServiceContext";

interface TopBarProps {
  onIconClick: (panel: PanelType) => void;
  activePanel: PanelType;
}

export const TopBar = ({ onIconClick, activePanel }: TopBarProps) => {
  const { isOrganizer } = useMeetingService();
  const { getMember } = useMember();
  const [doubtToast, setDoubtToast] = useState<string | null>(null);
  const lastDoubtCountRef = useRef<number>(toolsStore.getDoubts().length);

  useEffect(() => {
    if (!isOrganizer) return;
    const unsub = toolsStore.subscribe(() => {
      const curr = toolsStore.getDoubts().length;
      if (curr > lastDoubtCountRef.current) {
        const latest = toolsStore.getLatestDoubt();
        const sender = latest ? getMember(latest.memberId) : undefined;
        const who = sender?.name ?? "A participant";
        setDoubtToast(`${who} raised a doubt — open Doubts`);
        window.setTimeout(() => setDoubtToast(null), 4500);
      }
      lastDoubtCountRef.current = curr;
    });
    return () => unsub();
  }, [getMember, isOrganizer]);

  const isPeoplePanelActive = activePanel === PanelType.people;
  const isChatPanelActive = activePanel === PanelType.chat;
  const isDoubtsActive = activePanel === PanelType.doubts;
  const isWhiteboardActive = activePanel === PanelType.whiteboard;
  const isNotesActive = activePanel === PanelType.notes;

  return (
    <div className="flex items-center justify-between h-14 px-6 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <InfoDialog />
        <div className="h-4 w-px bg-[var(--border-subtle)] mx-2" />
        <span className="text-sm font-semibold text-[var(--text-primary)]">Classroom</span>
        {doubtToast && (
          <div className="ml-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-secondary)]">
            {doubtToast}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className={`h-9 px-3 ${isDoubtsActive ? "border border-[var(--border-focus)]" : ""}`}
          onClick={() => onIconClick(PanelType.doubts)}
        >
          Doubts
        </Button>
        <Button
          variant="secondary"
          className={`h-9 px-3 ${isWhiteboardActive ? "border border-[var(--border-focus)]" : ""}`}
          onClick={() => onIconClick(PanelType.whiteboard)}
        >
          Whiteboard
        </Button>
        <Button
          variant="secondary"
          className={`h-9 px-3 ${isNotesActive ? "border border-[var(--border-focus)]" : ""}`}
          onClick={() => onIconClick(PanelType.notes)}
        >
          Notes
        </Button>
        <PeoplePanelButton
          onIconClick={onIconClick}
          isPeoplePanelActive={isPeoplePanelActive}
        />
        <ChatButton
          onIconClick={onIconClick}
          isChatPanelActive={isChatPanelActive}
        />
      </div>
    </div>
  );
};
