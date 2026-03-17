import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-5xl px-6 md:px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-primary)] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 10l5-5m0 0l-5-5m5 5H9a6 6 0 000 12h3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-[var(--text-primary)]">
              EduConnect
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button>Create account</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              A calm classroom for real-time learning.
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
              Meetings, attendance, chat, and collaboration tools designed for
              long sessions—minimal, readable, and focused.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button className="!py-3 px-6">Get started</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="!py-3 px-6">
                  I already have an account
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                What you can do
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2">
                  <span className="text-[var(--accent-primary)]">•</span>
                  Create multiple sessions & share meeting IDs
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-primary)]">•</span>
                  Track attendance duration automatically
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-primary)]">•</span>
                  Raise doubts, whiteboard, and lecture notes
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

