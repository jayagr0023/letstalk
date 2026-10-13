import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

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

        // socket io.
        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

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
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, recieverId] },
        }).populate("messages");
        return res.status(200).json(conversation?.messages ?? []);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}