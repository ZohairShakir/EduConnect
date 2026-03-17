import io from "socket.io-client";

const SOCKET_HOST = "http://localhost:3001";
const STUN_SERVER = "stun:stun.l.google.com:19302";

export const iceServers: RTCIceServer[] = [{ urls: STUN_SERVER }];

export const socketServer: any = io(SOCKET_HOST);