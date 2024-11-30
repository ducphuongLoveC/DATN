
export default function(socket, io) {
    socket.on("joinCommentRoom", (resource_id) => {
      if (resource_id) {
        socket.join(resource_id);
        console.log(`User ${socket.id} joined comment room: ${resource_id}`);
      }
    });
  
    socket.on("leaveCommentRoom", (resource_id) => {
      if (resource_id) {
        socket.leave(resource_id);
        console.log(`User ${socket.id} left comment room: ${resource_id}`);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  }
  