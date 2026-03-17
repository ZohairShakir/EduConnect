import React, { useEffect, useMemo, useState } from "react";
import { useMeetingService } from "../../../meeting/MeetingProvider";

function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const SessionDuration: React.FC = () => {
  const { joinedAtMs } = useMeetingService();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const elapsed = useMemo(() => {
    if (!joinedAtMs) return null;
    return formatElapsed(now - joinedAtMs);
  }, [joinedAtMs, now]);

  if (!elapsed) return null;

  return (
    <div className="text-sm font-medium text-[var(--text-secondary)]">
      Time in session: <span className="text-[var(--text-primary)]">{elapsed}</span>
    </div>
  );
};

