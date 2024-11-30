export default function (socket, io) {
  socket.on("joinNotificationRoom", (user_id) => {
    if (user_id) {
      socket.join(user_id);
      console.log(`User ${socket.id} joined nofification room: ${user_id}`);
    }
  });

  socket.on("leaveNotificationRoom", (user_id) => {
    if (user_id) {
      socket.leave(user_id);
      console.log(`User ${socket.id} left nofification room: ${user_id}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
}
