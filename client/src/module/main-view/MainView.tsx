import React, { useEffect, useState } from "react";
import { BottomBar } from "./component/bottom-bar/BottomBar";
import { MainViewContent } from "./component/main-view/MainViewContent";
import { TopBar } from "./component/top-bar/TopBar";
import { DrawerPanel } from "./component/main-view/DrawerPanel";
import { useMeetingService } from "../meeting/MeetingProvider";
import { useRTC } from "../rtc/RtcProvider";

export enum PanelType {
  none,
  people,
  chat,
  doubts,
  whiteboard,
  notes,
}

export const MainView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.none);
  const { meetingId } = useMeetingService();
  const { send } = useRTC();

  useEffect(() => {
    const onBeforeUnload = () => {
      if (meetingId) {
        send("leave-meeting", { meetingId });
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [meetingId, send]);

  const handleIconClick = (panel: PanelType) => {
    if (isOpen && activePanel === panel) {
      setIsOpen(false);
      setActivePanel(PanelType.none);
    } else {
      setActivePanel(panel);
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setActivePanel(PanelType.none);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--bg-primary)] overflow-hidden">
      <TopBar onIconClick={handleIconClick} activePanel={activePanel} />
      
      <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
        <MainViewContent />
      </main>

      <footer className="w-full bg-white border-t border-[var(--border-subtle)] p-4 flex justify-center items-center">
        <BottomBar />
      </footer>

      <DrawerPanel
        isOpen={isOpen}
        onClose={handleClose}
        activePanel={activePanel}
      />
    </div>
  );
};
