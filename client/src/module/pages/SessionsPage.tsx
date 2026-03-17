import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useMember } from "../members/MemberServiceContext";
import { createSession, getSessionsByHost, SessionDto } from "../api/sessionsApi";
import { useMeetingService } from "../meeting/MeetingProvider";
import { useRTC } from "../rtc/RtcProvider";

export const SessionsPage: React.FC = () => {
  const { localSocketId, members } = useMember();
  const { setMeetingId, setMeetingStatus, setIsOrganizer } = useMeetingService();
  const { send } = useRTC();
  const [sessions, setSessions] = useState<SessionDto[]>([]);
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const refresh = () => {
    if (!localSocketId) return;
    getSessionsByHost(localSocketId).then(setSessions).catch(() => {});
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSocketId]);

  const onCreate = async () => {
    if (!localSocketId) return;
    setIsCreating(true);
    try {
      await createSession({ hostId: localSocketId, title });
      setTitle("");
      refresh();
    } finally {
      setIsCreating(false);
    }
  };

  const loadAsHost = (id: string) => {
    setMeetingId(id);
    setIsOrganizer(true);
    setMeetingStatus("created");
    send("create-meeting", { meetingId: id, name: members[0]?.name });
  };

  return (
    <Layout title="Sessions">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Create a session
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Generate a new meeting ID for a classroom session.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3">
                <Input
                  label="Session title (optional)"
                  placeholder="e.g., Physics — Lecture 4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={onCreate} disabled={!localSocketId || isCreating}>
                    Create session
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Your sessions
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Load an existing session ID as the host.
                  </p>
                </div>
                <Button variant="ghost" onClick={refresh}>
                  Refresh
                </Button>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {!localSocketId ? (
                  <div className="text-sm text-[var(--text-muted)]">Connecting…</div>
                ) : sessions.length === 0 ? (
                  <div className="text-sm text-[var(--text-muted)]">No sessions yet.</div>
                ) : (
                  sessions.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-[var(--text-primary)] truncate">
                          {s.title || "Untitled session"}
                        </div>
                        <div className="mt-1 text-xs font-mono text-[var(--text-muted)]">
                          {s.id.slice(0, 4)}-{s.id.slice(4)}
                        </div>
                      </div>
                      <Button variant="secondary" onClick={() => loadAsHost(s.id)}>
                        Load
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

