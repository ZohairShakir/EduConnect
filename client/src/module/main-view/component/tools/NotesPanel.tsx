import React, { useMemo, useState } from "react";
import { Button } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";

function simpleSummarize(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  // Very lightweight: return first 3–5 sentences (works surprisingly well for lectures)
  return sentences.slice(0, Math.min(5, sentences.length)).join(" ");
}

export const NotesPanel: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [notes, setNotes] = useState("");

  const canSpeech = useMemo(
    () =>
      typeof window !== "undefined" &&
      // @ts-ignore
      (window.SpeechRecognition || window.webkitSpeechRecognition),
    []
  );

  const startLocalTranscript = () => {
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (event: any) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) finalText += res[0].transcript + " ";
      }
      if (finalText) setTranscript((prev) => (prev + " " + finalText).trim());
    };
    rec.start();
    alert("Live transcript started (browser-based). Close this alert and speak.");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Lecture notes
            </div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">
              Capture a transcript and generate concise notes. (Local, no API key.)
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setTranscript("")}
              disabled={!transcript}
            >
              Clear
            </Button>
            <Button
              onClick={() => setNotes(simpleSummarize(transcript))}
              disabled={!transcript}
            >
              Generate
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="ghost"
            onClick={startLocalTranscript}
            disabled={!canSpeech}
          >
            Start transcript
          </Button>
          {!canSpeech && (
            <span className="text-xs text-[var(--text-muted)]">
              SpeechRecognition not supported in this browser — paste transcript manually.
            </span>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Transcript
        </div>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your transcript here…"
          className="mt-3 w-full min-h-[140px] rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-1 focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)]"
        />
      </Card>

      <Card className="p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Notes
        </div>
        <div className="mt-3 whitespace-pre-wrap text-sm text-[var(--text-secondary)]">
          {notes || "Generate notes to see a summary here."}
        </div>
      </Card>
    </div>
  );
};

