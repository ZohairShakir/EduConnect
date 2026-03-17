import React from "react";
import { Member } from "../../../members/types";
import { useMember } from "../../../members/MemberServiceContext";

export const PeoplePanel = () => {
  const { members } = useMember();
  
  return (
    <div className="flex flex-col gap-1 p-4">
      {members.map((member: Member) => (
        <div
          key={member.memberId}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors group"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)] text-white text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
            {member.name ? member.name.slice(0, 2).toUpperCase() : "??"}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {member.name}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">
              {member.isLocal ? "You" : "Participant"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
