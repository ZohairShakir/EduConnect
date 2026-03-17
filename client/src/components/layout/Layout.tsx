import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen w-full bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)]">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={title} />
        
        <main className="flex-1 overflow-y-auto w-full">
          <div className="mx-auto max-w-5xl py-8 px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
