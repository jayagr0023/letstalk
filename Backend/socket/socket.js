import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

export const frontendOrigin = process.env.FRONTEND_URL?.replace(/\/+$/, "");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: frontendOrigin,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const userSocketMap = new Map();

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap.get(receiverId);
}   

io.on("connection", (socket) => {
    // console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap.set(userId, socket.id);
    }

    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
        // console.log("A user disconnected", socket.id);
        if (userId !== undefined) {
            userSocketMap.delete(userId);
            // to inform all the users about the online users
            io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
        }
    }
    );
});

export { app, server, io };
