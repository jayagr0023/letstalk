import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import { app ,server} from "./socket/socket.js";
import cors from "cors";
dotenv.config();

// const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("<html><body><h1>Welcome to the LetsTalk</h1></body></html>");
    console.log("API is running...");
});

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

await connectDB();
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});