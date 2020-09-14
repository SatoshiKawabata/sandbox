import express from "express";
import http from "http";
import socketIo from "socket.io";
const app = express();

const httpServer = http.createServer(app);
const io = socketIo(httpServer);

const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg);
    // io.emit("chat message", msg);
  });
});
