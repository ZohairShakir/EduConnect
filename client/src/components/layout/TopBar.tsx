import React from 'react';
import { BsSearch } from 'react-icons/bs';

interface TopBarProps {
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title = 'EduConnect' }) => {
  return (
    <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-6">
      <div className="font-semibold text-[var(--text-primary)]">
        {title}
      </div>
      
      <div className="w-64">
        <div className="relative">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={14} />
          <input
            type="text"
            placeholder="Search..."
            className="h-8 w-full rounded-md bg-[var(--bg-secondary)] pl-9 pr-3 text-sm text-[var(--text-primary)] transition-colors duration-200 focus:border-[var(--border-focus)] focus:bg-[var(--bg-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--border-focus)] placeholder:text-[var(--text-muted)] border border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
