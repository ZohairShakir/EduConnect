import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-[520px] w-[520px] rounded-full bg-[var(--accent-primary)]/8 blur-[120px]" />
        <div className="absolute -bottom-32 -left-24 h-[520px] w-[520px] rounded-full bg-[var(--accent-primary)]/6 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 py-10 md:py-14">
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

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-sidebar)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
              Built for calm, long classroom sessions
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
              EduConnect
              <span className="block text-[var(--text-secondary)] font-semibold mt-2">
                a Notion-clean meeting classroom.
              </span>
            </h1>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-xl">
              Create sessions, bring students in with a code, track attendance automatically,
              and collaborate with doubts, a shared whiteboard, and live notes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button className="!py-3 px-7 text-base">Get started</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="!py-3 px-7 text-base">
                  Sign in
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Sessions</div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  Create multiple classes with shareable meeting IDs.
                </div>
              </Card>
              <Card className="p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Attendance</div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  Track join/leave duration automatically.
                </div>
              </Card>
              <Card className="p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Tools</div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  Doubts, whiteboard, and lecture notes—built in.
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Preview
              </div>
              <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4">
                <div className="h-2 w-24 rounded-full bg-[var(--border-subtle)]" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-28 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]" />
                  <div className="h-28 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]" />
                  <div className="h-28 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]" />
                  <div className="h-28 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]" />
                </div>
              </div>
              <div className="mt-4 text-sm text-[var(--text-muted)]">
                Minimal layout, subtle borders, and comfortable spacing.
              </div>
            </Card>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                How it works
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Start a class in minutes.
              </h2>
              <p className="mt-2 text-[var(--text-secondary)] max-w-2xl">
                Simple flow for teachers and students—no clutter, no confusion.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">1</div>
              <div className="mt-2 font-semibold text-[var(--text-primary)]">Create a session</div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">
                Generate a meeting code and share it with your students.
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">2</div>
              <div className="mt-2 font-semibold text-[var(--text-primary)]">Meet & teach</div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">
                Use doubts, whiteboard, and chat without distracting UI.
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">3</div>
              <div className="mt-2 font-semibold text-[var(--text-primary)]">Review outcomes</div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">
                Attendance duration and notes help you follow up quickly.
              </div>
            </Card>
          </div>
        </div>

        {/* Feature sections */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6">
            <Card className="p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Designed for readability
              </div>
              <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                Notion-inspired layout and spacing.
              </h3>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                Flat surfaces, subtle borders, and consistent spacing—comfortable for long sessions.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                  Calm contrast
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                  Clear hierarchy
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                  Whitespace first
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                  Smooth interactions
                </div>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-6">
            <Card className="p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Collaboration tools
              </div>
              <h3 className="mt-2 text-xl font-bold text-[var(--text-primary)]">
                Teach with doubts, whiteboard, and notes.
              </h3>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                Students can raise questions, everyone sees the whiteboard, and notes can be generated from a transcript.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Raise doubts</span>
                  <span className="text-xs text-[var(--text-muted)]">host notified</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Shared whiteboard</span>
                  <span className="text-xs text-[var(--text-muted)]">live sync</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Lecture notes</span>
                  <span className="text-xs text-[var(--text-muted)]">auto summary</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            FAQ
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Common questions
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="font-semibold text-[var(--text-primary)]">Is the transcript automatic?</div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">
                Browsers require one-time permission. Teachers click “Start transcript” once, then notes can auto-update.
              </div>
            </Card>
            <Card className="p-6">
              <div className="font-semibold text-[var(--text-primary)]">Do students see the whiteboard?</div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">
                Yes—whiteboard strokes are broadcast to everyone and persist even if they open the panel later.
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border-subtle)] pt-10 flex items-center justify-between text-sm text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} EduConnect</span>
          <span>Built for focused learning</span>
        </div>
      </div>
    </div>
  );
};

