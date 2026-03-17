import React, { useEffect, useMemo, useState } from "react";
import { useMember } from "../../../members/MemberServiceContext";

export type DoubtEvent = {
  memberId: string;
  text: string;
  time: string;
};

export const DoubtsPanel: React.FC = () => {
  const { getMember } = useMember();
  const [doubts, setDoubts] = useState<DoubtEvent[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<DoubtEvent>;
      if (!ce.detail) return;
      setDoubts((prev) => [ce.detail, ...prev]);
    };
    window.addEventListener("educonnect:doubt", handler as EventListener);
    return () =>
      window.removeEventListener("educonnect:doubt", handler as EventListener);
  }, []);

  const rows = useMemo(
    () =>
      doubts.map((d, idx) => {
        const member = getMember(d.memberId);
        return {
          key: `${d.memberId}-${d.time}-${idx}`,
          name: member?.name ?? "Participant",
          time: d.time,
          text: d.text,
        };
      }),
    [doubts, getMember]
  );

  return (
    <div className="p-4">
      {rows.length === 0 ? (
        <div className="text-sm text-[var(--text-muted)]">
          No doubts yet. Participants can raise doubts during the session.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => (
            <div
              key={r.key}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {r.name}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{r.time}</div>
              </div>
              <div className="mt-2 text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
                {r.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

