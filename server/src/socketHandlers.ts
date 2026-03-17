import { Server, Socket } from "socket.io";
import {
  User,
  Meeting,
  CreateMeetingPayload,
  JoinMeetingPayload,
  OfferPayload,
  AnswerPayload,
  IceCandidatePayload,
} from "./types/types";
import { markJoin, markLeave } from "./store/attendanceStore";
import { getSessionById, upsertSessionParticipant } from "./store/sessionStore";

const users: { [key: string]: User } = {};
const meetings: { [key: string]: Meeting } = {};

export const setupSocketHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    io.to(socket.id).emit("connected-to-socket", { socketId: socket.id });

    socket.on("create-meeting", ({ meetingId, name }: CreateMeetingPayload) => {
      const user: User = { id: socket.id, name, meetingId };
      if (!meetings[meetingId]) {
        users[socket.id] = user;
        meetings[meetingId] = { status: "created", users: [user] };
      }

      // Keep socket in the room so that newly created organizers are part of the meeting
      socket.join(meetingId);

      console.log(`[socket] create-meeting: ${meetingId}, organizer=${name}, socket=${socket.id}`);
      console.log(`[socket] meetings=${JSON.stringify(meetings[meetingId])}`);

      // If this meetingId corresponds to a REST-created session, attach host as participant.
      if (getSessionById(meetingId)) {
        upsertSessionParticipant(meetingId, socket.id, name);
      }

      io.to(socket.id).emit("meeting-created", {
        meetingId,
        status: "created",
      });
    });

    socket.on("start-meeting", ({ meetingId }: { meetingId: string }) => {
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
      } else {
        io.to(socket.id).emit("meeting-started", {
          meetingId,
          status: "invalid",
        });
      }
    });

    socket.on("join-meeting", ({ meetingId, name }: JoinMeetingPayload) => {
      if (meetings[meetingId]) {
        const { status } = meetings[meetingId];
        const user: User = { id: socket.id, name, meetingId };

        // Track member in meeting
        if (!users[socket.id]) {
          users[socket.id] = user;
          meetings[meetingId].users.push(user);
        }

        socket.join(meetingId);
        console.log(`[socket] join-meeting: ${meetingId}, name=${name}, status=${status}, socket=${socket.id}`);
        io.to(socket.id).emit("join-meeting-response", { status, meetingId });

        // Attendance + session participant tracking
        if (getSessionById(meetingId)) {
          upsertSessionParticipant(meetingId, socket.id, name);
          markJoin({ sessionId: meetingId, userId: socket.id, name });
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
      } else {
        io.to(socket.id).emit("join-meeting-response", {
          status: "invalid",
          meetingId,
        });
      }
    });

    socket.on("leave-meeting", ({ meetingId }: { meetingId: string }) => {
      if (!meetingId) return;
      const record = markLeave({ sessionId: meetingId, userId: socket.id });
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
        const record = markLeave({ sessionId: user.meetingId, userId: socket.id });
        socket.to(user.meetingId).emit("user-left", {
          userId: socket.id,
          sessionId: user.meetingId,
          duration: record?.duration,
        });
      }
      delete users[socket.id];
    });

    socket.on("offer", (data: OfferPayload) => {
      io.to(data.to).emit("onOffer", { from: socket.id, ...data });
    });

    socket.on("answer", (data: AnswerPayload) => {
      io.to(data.to).emit("onAccepted", { from: socket.id, ...data });
    });

    socket.on("iceCandidate", (data: IceCandidatePayload) => {
      io.to(data.to).emit("onIceCandidate", { from: socket.id, ...data });
    });
  });
};
