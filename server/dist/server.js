"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socketHandlers_1 = require("./socketHandlers");
const sessionStore_1 = require("./store/sessionStore");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userStore_1 = require("./store/userStore");
const auth_1 = require("./auth/auth");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
// --- Auth API ---
app.post("/auth/signup", async (req, res) => {
    const { name, email, password, role } = req.body ?? {};
    if (!name || typeof name !== "string")
        return res.status(400).json({ error: "name is required" });
    if (!email || typeof email !== "string")
        return res.status(400).json({ error: "email is required" });
    if (!password || typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ error: "password must be at least 8 characters" });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const userRole = role === "teacher" ? "teacher" : "student";
    if ((0, userStore_1.getUserByEmail)(normalizedEmail)) {
        return res.status(409).json({ error: "email already in use" });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = (0, userStore_1.createUser)({
        id: (0, uuid_1.v4)(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: userRole,
        createdAt: new Date(),
    });
    const token = (0, auth_1.signUserToken)({ sub: user.id, email: user.email, role: user.role, name: user.name });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || typeof email !== "string")
        return res.status(400).json({ error: "email is required" });
    if (!password || typeof password !== "string")
        return res.status(400).json({ error: "password is required" });
    const user = (0, userStore_1.getUserByEmail)(email.toLowerCase().trim());
    if (!user)
        return res.status(401).json({ error: "invalid credentials" });
    const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ error: "invalid credentials" });
    const token = (0, auth_1.signUserToken)({ sub: user.id, email: user.email, role: user.role, name: user.name });
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
    const session = {
        id: meetingId,
        hostId,
        title: typeof title === "string" && title.trim() ? title.trim() : "Untitled session",
        createdAt: new Date(),
        participants: [],
    };
    (0, sessionStore_1.createSession)(session);
    return res.json({ session });
});
// GET /sessions/:id -> { session }
app.get("/sessions/:id", (req, res) => {
    const session = (0, sessionStore_1.getSessionById)(req.params.id);
    if (!session)
        return res.status(404).json({ error: "Session not found" });
    return res.json({ session });
});
// GET /sessions/host/:hostId -> { sessions }
app.get("/sessions/host/:hostId", (req, res) => {
    const sessions = (0, sessionStore_1.getSessionsByHostId)(req.params.hostId);
    return res.json({ sessions });
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: true, methods: ["GET", "POST"] },
});
(0, socketHandlers_1.setupSocketHandlers)(io);
const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port} (REST + Socket.IO)`);
});
function generateMeetingId() {
    // 8-char uppercase code (no confusing chars like 0/O, 1/I)
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < 8; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}
