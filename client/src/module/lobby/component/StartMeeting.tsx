import React from "react"
import { useMeetingService } from "../../meeting/MeetingProvider"
import { useNavigate } from "react-router-dom"
import { useRTC } from "../../rtc/RtcProvider"
import { useMediaService } from "../../media/useMediaService"
import { useMember } from "../../members/MemberServiceContext"
import { Button } from "../../../components/ui/Button"
import { Card } from "../../../components/ui/Card"

export const StartMeeting = () => {
  const { meetingId, setIsOrganizer, setMeetingStatus } = useMeetingService()
  const { members, updateStream } = useMember()
  const { send } = useRTC()
  const navigate = useNavigate()
  const { webCamStream, isWebCamEnabled } = useMediaService()

  const [copied, setCopied] = React.useState(false)

  const copyId = () => {
    navigator.clipboard.writeText(meetingId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const startMeeting = () => {
    send("start-meeting", { meetingId })
    setIsOrganizer(true)
    setMeetingStatus("started")
    if (members.length > 0) {
      const { memberId } = members[0]
      updateStream({
        memberId,
        connectionType: "media",
        streamType: "video",
        stream: webCamStream!,
        isEnabled: isWebCamEnabled,
      })
    }
    navigate(`/meet/${meetingId}`)
  }

  const formattedId = meetingId ? `${meetingId.slice(0, 4)}-${meetingId.slice(4)}` : meetingId

  return (
    <Card className="flex flex-col gap-6 w-full">
      <div className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
        Hi, {members[0]?.name || "there"} 👋
      </div>

      <div className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Meeting ID
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-bold tracking-widest text-[var(--accent-primary)]">
            {formattedId}
          </span>
          <Button variant="ghost" className="!px-3 !py-1.5 border border-[var(--border-subtle)] bg-white text-xs shadow-sm hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]" onClick={copyId}>
            {copied ? (
              <>
                <svg className="mr-1.5" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="mr-1.5" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Copy ID
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-blue-100 bg-blue-50/50 p-3 text-sm text-blue-700">
        Share this ID with participants before starting.
      </div>

      <Button className="w-full !py-3 text-base" onClick={startMeeting}>
        <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
        </svg>
        Start Session
      </Button>
    </Card>
  )
}
