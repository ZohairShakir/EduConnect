import React, { useEffect, useState } from "react"
import { useMeetingService } from "../meeting/MeetingProvider"
import { useMember } from "../members/MemberServiceContext"
import { getSessionsByHost, SessionDto } from "../api/sessionsApi"
import { useRTC } from "../rtc/RtcProvider"
import { useLobbyHooks } from "./hooks/useLobbyHooks"
import { StartMeeting } from "./component/StartMeeting"
import { LocalWebCamStreamContainer } from "./component/LocalWebCamStreamContainer"
import { JoinMeeting } from "./component/join-meeting/JoinMeeting"
import { Layout } from "../../components/layout/Layout"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"

export const Lobby = () => {
  const { meetingStatus, setMeetingId, setMeetingStatus, setIsOrganizer } = useMeetingService()
  const { localSocketId } = useMember()
  const { send } = useRTC()
  const [sessions, setSessions] = useState<SessionDto[]>([])

  const {
    handleCreateMeeting,
    name,
    handleNameChange,
    nameValidationError,
    validateName,
    sessionTitle,
    setSessionTitle,
  } = useLobbyHooks()

  useEffect(() => {
    if (!localSocketId) return
    getSessionsByHost(localSocketId)
      .then(setSessions)
      .catch((e) => console.warn("Failed to load sessions", e))
  }, [localSocketId, meetingStatus])

  if (meetingStatus === "created") {
    return (
      <Layout>
        <div className="flex h-full min-h-[500px] items-center justify-center">
          <div className="w-full max-w-md">
            <StartMeeting />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-5 relative z-10">
          <Card>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Camera Preview</h3>
            <LocalWebCamStreamContainer />
          </Card>

          <Card>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Session Details</h3>
            <div className="space-y-4">
              <Input
                label="Your Display Name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                error={nameValidationError}
              />
              <Input
                label="Session Title (optional)"
                placeholder="e.g., Math – Algebra 101"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleCreateMeeting}>
              <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Create Session
            </Button>
            <JoinMeeting validateName={validateName} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 lg:col-span-7 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Your Sessions</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Sessions you've hosted</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                if (!localSocketId) return
                getSessionsByHost(localSocketId).then(setSessions).catch(() => {})
              }}
            >
              <svg className="mr-2" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-[var(--accent-primary)]">{sessions.length}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Total Sessions</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                {localSocketId ? "Live" : "–"}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Status</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-[var(--text-primary)]">0</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Active Now</div>
            </Card>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-2 max-h-[calc(100vh-320px)]">
            {!localSocketId ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-[var(--text-muted)] border-2 border-dashed border-[var(--border-subtle)] rounded-xl">
                <div className="text-2xl">⏳</div>
                <p className="text-sm">Connecting to server…</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-[var(--text-muted)] border-2 border-dashed border-[var(--border-subtle)] rounded-xl">
                <div className="text-2xl">📋</div>
                <p className="text-sm">No sessions yet. Create one to get started.</p>
              </div>
            ) : (
              sessions.map((s) => (
                <Card key={s.id} className="flex items-center justify-between p-4 transition-all hover:border-[var(--accent-primary)] hover:shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-[var(--text-primary)]">{s.title || "Untitled Session"}</div>
                    <div className="text-xs text-[var(--text-muted)] font-mono">
                      ID: {s.id.slice(0, 4)}-{s.id.slice(4)}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (!validateName()) return
                      setMeetingId(s.id)
                      setIsOrganizer(true)
                      setMeetingStatus("created")
                      send("create-meeting", { meetingId: s.id, name })
                    }}
                  >
                    Load
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
