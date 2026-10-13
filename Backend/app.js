import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import { app ,server} from "./socket/socket.js";
import cors from "cors";
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
await connectDB();
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});