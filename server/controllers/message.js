import { TryCatch } from "../middlewares/error.js";
import Comment from "../models/comment.js";
import Message from "../models/message.js";
import ErrorHandler from "../utils/utility-class.js";


export const CreateMessage = TryCatch(async (req, res, next) => {

    const { senderId, message, receiverId } = req.body;
    await Message.create({
        senderId,
        message,
        receiverId,
    })
    return res.status(200).json({
        message: "Message created successfully",
        success: true,
    });
})

export const FetchMessages = TryCatch(async (req, res, next) => {
    const message = await Message.find({
        $or: [
            { senderId: req.userId }, { receiverId: req.userId }
        ]
    }).populate("senderId");
    // if (!message) {
    //     return new ErrorHandler("message not found", 404);
    // }
    return res.status(200).json({
        message: "Message sent successfully",
        success: true,
        data: message,
    });
})

