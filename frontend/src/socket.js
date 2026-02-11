import { io } from "socket.io-client";

const socket = io((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://main-project-codex-five.vercel.app", {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
