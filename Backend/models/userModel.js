import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://api.dicebear.com/10.x/lorelei/svg?seed=default"
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },
}, { timestamps: true });

export const User = mongoose.model("User", userModel);