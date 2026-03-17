import React, { useState, useRef, useEffect } from "react";
import { FaInfo } from "react-icons/fa";
import { useMeetingService } from "../../../meeting/MeetingProvider";

export const InfoDialog = () => {
  const { meetingId } = useMeetingService();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const onCopy = () => {
    navigator.clipboard.writeText(meetingId || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formattedId = meetingId ? meetingId.replace(/(\d{4})(\d{4})/, "$1-$2") : "";

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={handleToggle}
        title="Meeting Info"
        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 
          ${isOpen 
            ? "bg-[var(--accent-primary)] text-white border-transparent" 
            : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
          }`}
        aria-label="Info"
      >
        <FaInfo size={12} />
      </button>

      {isOpen && (
        <div className="absolute top-10 left-0 w-64 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl z-50 p-5 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Meeting Info</h3>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--text-muted)]">Meeting ID</span>
              <div className="flex items-center justify-between gap-2 p-2 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)]">
                <span className="text-sm font-mono font-bold text-[var(--accent-primary)]">{formattedId}</span>
                <button 
                  onClick={onCopy}
                  className="text-[10px] font-bold uppercase tracking-tight text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Participants can join using this ID. The stream is protected and encrypted.
            </p>
          </div>
          
          <div className="absolute top-[-6px] left-3 w-3 h-3 bg-[var(--bg-primary)] border-t border-l border-[var(--border-subtle)] rotate-45"></div>
        </div>
      )}
    </div>
  );
};
