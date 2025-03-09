import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("id", socket.id);
  socket.on("disconnect", () => {
    console.log("user Disconnected", socket.id);
  });
  socket.on("msg", (data) => {
    console.log(data);
    io.emit("all", data);
  });
});

app.get("/", (req, res) => {
  res.send("hellow world wedede");
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
