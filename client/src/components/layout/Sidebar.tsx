import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsHouseDoor, BsCollectionPlay, BsGear } from 'react-icons/bs';
import { useAuth } from '../../module/auth/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: <BsHouseDoor size={18} /> },
    { label: 'Sessions', path: '/sessions', icon: <BsCollectionPlay size={18} /> },
    { label: 'Settings', path: '/settings', icon: <BsGear size={18} /> },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)] py-6">
      <div className="mb-8 px-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent-primary)] text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 10l5-5m0 0l-5-5m5 5H9a6 6 0 000 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-[var(--text-primary)]">EduConnect</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
                ${isActive 
                  ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'}
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="px-6 mt-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)]">
            {(user?.name?.slice(0, 1) || "?").toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {user?.name || "Guest"}
            </span>
            <button
              className="text-left text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
