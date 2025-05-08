import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
console.log('kkkkkkkk',process.env.FRONTEND_URI);
const io = new Server(server, {
  cors: {
    origin: [`${process.env.FRONTEND_URI}`],
  },
});


const userSocketMap = {}; 
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

let onlineUsers = [];


io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("newUser", (userId) => {
    userSocketMap[userId] = socket.id;
    if (!onlineUsers.some((u) => u.socketId === socket.id)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
  });
  socket.on("sendNotification", ({assignedTo, title}) => {
    assignedTo.forEach(userId => {
      const receiverSocketId = getReceiverSocketId(userId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("getNotification", {title: title});
      }
    });
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
 
  });
});



export { io, app, server };
