import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import { app ,server} from "./socket/socket.js";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
dotenv.config();

const frontendDist = resolve(dirname(fileURLToPath(import.meta.url)), "../frontend/dist");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(frontendDist));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile(resolve(frontendDist, "index.html"));
});

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.get("/{*path}", (req, res, next) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/socket.io")) {
        return next();
    }

    res.sendFile(resolve(frontendDist, "index.html"), (error) => {
        if (error) next(error);
    });
});

await connectDB();
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});