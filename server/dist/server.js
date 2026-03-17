"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socketHandlers_1 = require("./socketHandlers");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
    },
});
(0, socketHandlers_1.setupSocketHandlers)(io);
const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    console.log(`Socket.IO server is running on http://localhost:${port}`);
});
