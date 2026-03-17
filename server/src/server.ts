import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupSocketHandlers } from "./socketHandlers";
import { createSession, getSessionById, getSessionsByHostId } from "./store/sessionStore";
import { Session } from "./models/session";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail, UserRole } from "./store/userStore";
import { signUserToken } from "./auth/auth";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// --- Auth API ---
app.post("/auth/signup", async (req, res) => {
  const { name, email, password, role } = req.body ?? {};
  if (!name || typeof name !== "string") return res.status(400).json({ error: "name is required" });
  if (!email || typeof email !== "string") return res.status(400).json({ error: "email is required" });
  if (!password || typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "password must be at least 8 characters" });
  }
  const normalizedEmail = email.toLowerCase().trim();
  const userRole: UserRole = role === "teacher" ? "teacher" : "student";

  if (getUserByEmail(normalizedEmail)) {
    return res.status(409).json({ error: "email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: userRole,
    createdAt: new Date(),
  });

  const token = signUserToken({ sub: user.id, email: user.email, role: user.role, name: user.name });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || typeof email !== "string") return res.status(400).json({ error: "email is required" });
  if (!password || typeof password !== "string") return res.status(400).json({ error: "password is required" });

  const user = getUserByEmail(email.toLowerCase().trim());
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });

  const token = signUserToken({ sub: user.id, email: user.email, role: user.role, name: user.name });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// --- Sessions REST API ---
// POST /sessions/create { hostId, title? } -> { session }
app.post("/sessions/create", (req, res) => {
  const { hostId, title } = req.body ?? {};
  if (!hostId || typeof hostId !== "string") {
    return res.status(400).json({ error: "hostId is required" });
  }

  const meetingId = generateMeetingId();
  const session: Session = {
    id: meetingId,
    hostId,
    title: typeof title === "string" && title.trim() ? title.trim() : "Untitled session",
    createdAt: new Date(),
    participants: [],
  };

  createSession(session);
  return res.json({ session });
});

// GET /sessions/:id -> { session }
app.get("/sessions/:id", (req, res) => {
  const session = getSessionById(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  return res.json({ session });
});

// GET /sessions/host/:hostId -> { sessions }
app.get("/sessions/host/:hostId", (req, res) => {
  const sessions = getSessionsByHostId(req.params.hostId);
  return res.json({ sessions });
});

const httpServer = createServer(app);
const io: SocketIOServer = new SocketIOServer(httpServer, {
  cors: { origin: true, methods: ["GET", "POST"] },
});

setupSocketHandlers(io);

const port: string | number = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port} (REST + Socket.IO)`);
});

function generateMeetingId(): string {
  // 8-char uppercase code (no confusing chars like 0/O, 1/I)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}
