const rooms = {}; // roomId : password

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // 🔐 JOIN ROOM WITH PASSWORD
    socket.on("join-room", ({ roomId, password }) => {
      console.log("Join request:", roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = password;
        socket.join(roomId);
        socket.emit("joined", "Room created");
      } else if (rooms[roomId] === password) {
        socket.join(roomId);
        socket.emit("joined", "Joined room");
      } else {
        socket.emit("room-error", "❌ Invalid room password");
      }
    });

    // 🔁 REAL-TIME CODE
    socket.on("code-change", ({ roomId, code }) => {
      socket.to(roomId).emit("receive-code", code);
    });

    // 💬 REAL-TIME CHAT
    socket.on("send-message", ({ roomId, message, sender }) => {
      io.to(roomId).emit("receive-message", {
        sender,
        message,
        time: new Date().toLocaleTimeString(),
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
