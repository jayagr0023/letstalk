import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const recieverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            members: { $all: [senderId, recieverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                members: [senderId, recieverId],
            });
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        });


        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        await gotConversation.save();

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const recieverId = req.params.id;
        const query = {
            $or: [
                { senderId, recieverId },
                { senderId: recieverId, recieverId: senderId },
            ],
        };

        if (req.query.after) {
            if (!mongoose.isValidObjectId(req.query.after)) {
                return res.status(400).json({ message: "Invalid message cursor" });
            }
            query._id = { $gt: new mongoose.Types.ObjectId(req.query.after) };
        }

        const messages = await Message.find(query).sort({ _id: 1 });
        return res.status(200).json(messages);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}