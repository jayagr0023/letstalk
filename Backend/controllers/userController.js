import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const BCRYPT_SALT_ROUNDS = 12;
const AUTH_COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
const AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

export const signup = async (req, res) => {

    try {
        const { fullName, email, password, confirmPassword, gender } = req.body;

        if (!fullName || !email || !password || !confirmPassword || !gender)
            return res.status(400).json({ message: "All fields are required" });

        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords do not match" });

        const user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        const profilePic = `https://api.dicebear.com/10.x/lorelei/svg?seed=${fullName}`;

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            gender,
            profilePic
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, {
            ...AUTH_COOKIE_OPTIONS,
            maxAge: AUTH_COOKIE_MAX_AGE,
        }).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                gender: newUser.gender,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist, Register!" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        if (bcrypt.getRounds(user.password) > BCRYPT_SALT_ROUNDS) {
            user.password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, {
            ...AUTH_COOKIE_OPTIONS,
            maxAge: AUTH_COOKIE_MAX_AGE,
        }).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
                gender: user.gender,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export const logout = (req, res) => {
    try {
        return res.status(200).clearCookie("token", AUTH_COOKIE_OPTIONS).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const isLoggedInUser = req.userId;
        const otherUsers = await User.find({ _id: { $ne: isLoggedInUser } }).select("-password");
        const onlineUsers = otherUsers
            .filter((user) => user.lastActiveAt && Date.now() - user.lastActiveAt.getTime() < 60000)
            .map((user) => user._id);
        return res.status(200).json({ message: "Other users fetched successfully", otherUsers, onlineUsers });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const updatePresence = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, { lastActiveAt: new Date() });
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
export const getLoggedInUser = async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.userId).select("-password");
        if (!loggedInUser) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "Logged in user fetched successfully", loggedInUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}