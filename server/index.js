const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("send_move", (data) => {
    socket.to(data.room).emit("receive_move", data);
  });

  socket.on("send_typing", (data) => {
    socket.to(data.room).emit("receive_typing", data);
    console.log(data)
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});