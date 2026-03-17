import { DoubtEvent } from "./component/tools/DoubtsPanel";

type Point = { x: number; y: number };
type Stroke = { color: string; width: number; points: Point[] };
export type WhiteboardEvent =
  | { kind: "stroke"; stroke: Stroke }
  | { kind: "clear" };

type Listener = () => void;

let doubts: DoubtEvent[] = [];
let whiteboardStrokes: Stroke[] = [];

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export const toolsStore = {
  // --- Doubts ---
  addDoubt: (d: DoubtEvent) => {
    doubts = [d, ...doubts];
    emit();
  },
  getDoubts: () => doubts,

  // --- Whiteboard ---
  applyWhiteboardEvent: (e: WhiteboardEvent) => {
    if (e.kind === "clear") whiteboardStrokes = [];
    else whiteboardStrokes = [...whiteboardStrokes, e.stroke];
    emit();
  },
  getWhiteboardStrokes: () => whiteboardStrokes,

  // --- subscribe ---
  subscribe: (fn: Listener) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};

