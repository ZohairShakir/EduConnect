import io from "socket.io-client";

// For Netlify deploy, set REACT_APP_SERVER_URL to your Render URL, e.g.:
// https://educonnect-server.onrender.com
const SOCKET_HOST =
  process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
const STUN_SERVER = "stun:stun.l.google.com:19302";

export const iceServers: RTCIceServer[] = [{ urls: STUN_SERVER }];

export const socketServer: any = io(SOCKET_HOST, {
  transports: ["websocket", "polling"],
});