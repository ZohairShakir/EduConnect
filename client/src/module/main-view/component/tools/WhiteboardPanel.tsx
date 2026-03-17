import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMember } from "../../../members/MemberServiceContext";
import { Button } from "../../../../components/ui/Button";

type Point = { x: number; y: number };
type Stroke = { color: string; width: number; points: Point[] };

type WhiteboardEvent =
  | { kind: "stroke"; stroke: Stroke }
  | { kind: "clear" };

function getCanvasPoint(e: PointerEvent, canvas: HTMLCanvasElement): Point {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

export const WhiteboardPanel: React.FC = () => {
  const { sendMessage } = useMember();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<Stroke | null>(null);

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState("#2F80ED");
  const [width, setWidth] = useState(2);

  const background = useMemo(() => "var(--bg-primary)", []);

  // Receive remote events
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      const detail = ce.detail as WhiteboardEvent | undefined;
      if (!detail) return;
      if (detail.kind === "clear") {
        setStrokes([]);
      } else if (detail.kind === "stroke") {
        setStrokes((prev) => [...prev, detail.stroke]);
      }
    };
    window.addEventListener("educonnect:whiteboard", handler as EventListener);
    return () =>
      window.removeEventListener(
        "educonnect:whiteboard",
        handler as EventListener
      );
  }, []);

  // Render strokes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize for crispness
    const ratio = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.floor(w * ratio) || canvas.height !== Math.floor(h * ratio)) {
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);

    for (const s of strokes) {
      if (s.points.length < 2) continue;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    }
  }, [strokes, background]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e: PointerEvent) => {
      drawingRef.current = true;
      canvas.setPointerCapture(e.pointerId);
      const p = getCanvasPoint(e, canvas);
      currentStrokeRef.current = { color, width, points: [p] };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      const stroke = currentStrokeRef.current;
      if (!stroke) return;
      stroke.points.push(getCanvasPoint(e, canvas));
      // local preview by updating strokes at the end; keep it light
      setStrokes((prev) => {
        const next = prev.slice();
        const last = next[next.length - 1];
        if (last === stroke) return next;
        // If the stroke isn't in list yet, add temp reference
        if (!next.includes(stroke)) next.push(stroke);
        return next;
      });
    };

    const finish = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      const stroke = currentStrokeRef.current;
      currentStrokeRef.current = null;
      if (stroke && stroke.points.length > 1) {
        // broadcast finalized stroke
        const payload = { type: "whiteboard", event: { kind: "stroke", stroke } };
        sendMessage(payload);
      }
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", finish);
    canvas.addEventListener("pointercancel", finish);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", finish);
      canvas.removeEventListener("pointercancel", finish);
    };
  }, [color, width, sendMessage]);

  const onClear = () => {
    setStrokes([]);
    sendMessage({ type: "whiteboard", event: { kind: "clear" } });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="text-sm font-semibold text-[var(--text-primary)]">
          Whiteboard
        </div>
        <div className="flex items-center gap-2">
          <input
            aria-label="Color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-10 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
          />
          <select
            aria-label="Brush size"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="h-8 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2 text-sm text-[var(--text-primary)]"
          >
            <option value={2}>Thin</option>
            <option value={4}>Medium</option>
            <option value={6}>Thick</option>
          </select>
          <Button variant="secondary" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>
      <div className="flex-1 p-3 bg-[var(--bg-secondary)]">
        <div className="h-full w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
          <canvas ref={canvasRef} className="h-full w-full touch-none" />
        </div>
      </div>
    </div>
  );
};

