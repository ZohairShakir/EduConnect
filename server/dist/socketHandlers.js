"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketHandlers = void 0;
const attendanceStore_1 = require("./store/attendanceStore");
const sessionStore_1 = require("./store/sessionStore");
const users = {};
const meetings = {};
const setupSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        io.to(socket.id).emit("connected-to-socket", { socketId: socket.id });
        socket.on("create-meeting", ({ meetingId, name }) => {
            const user = { id: socket.id, name, meetingId };
            if (!meetings[meetingId]) {
                users[socket.id] = user;
                meetings[meetingId] = { status: "created", users: [user] };
            }
            // Keep socket in the room so that newly created organizers are part of the meeting
            socket.join(meetingId);
            console.log(`[socket] create-meeting: ${meetingId}, organizer=${name}, socket=${socket.id}`);
            console.log(`[socket] meetings=${JSON.stringify(meetings[meetingId])}`);
            // If this meetingId corresponds to a REST-created session, attach host as participant.
            if ((0, sessionStore_1.getSessionById)(meetingId)) {
                (0, sessionStore_1.upsertSessionParticipant)(meetingId, socket.id, name);
            }
            io.to(socket.id).emit("meeting-created", {
                meetingId,
                status: "created",
            });
        });
        socket.on("start-meeting", ({ meetingId }) => {
            if (meetings[meetingId]) {
                meetings[meetingId].status = "started";
                socket.join(meetingId);
                console.log(`[socket] start-meeting: ${meetingId}, socket=${socket.id}`);
                console.log(`[socket] meetings=${JSON.stringify(meetings[meetingId])}`);
                // Notify all participants that meeting has started
                io.to(meetingId).emit("meeting-started", {
                    meetingId,
                    status: "started",
                });
            }
            else {
                io.to(socket.id).emit("meeting-started", {
                    meetingId,
                    status: "invalid",
                });
            }
        });
        socket.on("join-meeting", ({ meetingId, name }) => {
            if (meetings[meetingId]) {
                const { status } = meetings[meetingId];
                const user = { id: socket.id, name, meetingId };
                // Track member in meeting
                if (!users[socket.id]) {
                    users[socket.id] = user;
                    meetings[meetingId].users.push(user);
                }
                socket.join(meetingId);
                console.log(`[socket] join-meeting: ${meetingId}, name=${name}, status=${status}, socket=${socket.id}`);
                io.to(socket.id).emit("join-meeting-response", { status, meetingId });
                // Attendance + session participant tracking
                if ((0, sessionStore_1.getSessionById)(meetingId)) {
                    (0, sessionStore_1.upsertSessionParticipant)(meetingId, socket.id, name);
                    (0, attendanceStore_1.markJoin)({ sessionId: meetingId, userId: socket.id, name });
                }
                if (status === "started") {
                    socket.to(meetingId).emit("new-user-joined", {
                        socketId: socket.id,
                        name,
                    });
                    socket.to(meetingId).emit("user-joined", {
                        userId: socket.id,
                        sessionId: meetingId,
                        name,
                    });
                }
            }
            else {
                io.to(socket.id).emit("join-meeting-response", {
                    status: "invalid",
                    meetingId,
                });
            }
        });
        socket.on("leave-meeting", ({ meetingId }) => {
            if (!meetingId)
                return;
            const record = (0, attendanceStore_1.markLeave)({ sessionId: meetingId, userId: socket.id });
            socket.to(meetingId).emit("user-left", {
                userId: socket.id,
                sessionId: meetingId,
                duration: record?.duration,
            });
            socket.leave(meetingId);
        });
        socket.on("disconnect", () => {
            const user = users[socket.id];
            if (user?.meetingId) {
                const record = (0, attendanceStore_1.markLeave)({ sessionId: user.meetingId, userId: socket.id });
                socket.to(user.meetingId).emit("user-left", {
                    userId: socket.id,
                    sessionId: user.meetingId,
                    duration: record?.duration,
                });
            }
            delete users[socket.id];
        });
        socket.on("offer", (data) => {
            io.to(data.to).emit("onOffer", { from: socket.id, ...data });
        });
        socket.on("answer", (data) => {
            io.to(data.to).emit("onAccepted", { from: socket.id, ...data });
        });
        socket.on("iceCandidate", (data) => {
            io.to(data.to).emit("onIceCandidate", { from: socket.id, ...data });
        });
    });
};
exports.setupSocketHandlers = setupSocketHandlers;
