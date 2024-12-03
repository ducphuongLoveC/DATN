import express from "express";
import router from "./routes/index.js";
import { PORT } from "./utils/env.js";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import { errorCommon, errorNotFound } from "./utils/errors.js";

import { createServer } from "http";
import { Server } from "socket.io";

import { BASE_URL_CLIENT } from "./utils/env.js";

// room sockets
import CommentRoom from "./sockets/CommentRoom.js";
import notificationRoom from "./sockets/notificationRoom.js";

const app = express();

connectDB();
app.use(express.static("uploads"));
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: BASE_URL_CLIENT,
    methods: ["GET", "POST"],
  },
});

// Lưu thông tin phòng cho từng resource_id

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  CommentRoom(socket, io);
  notificationRoom(socket, io);
  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Xóa thông tin khi ngắt kết nối
  });
});

// Middleware để thêm io vào req
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", router); 

app.use(errorNotFound, errorCommon);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
