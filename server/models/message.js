import { Schema, model } from "mongoose";


const MessageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'user',

    },
    message: {
        type: String,

    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true,
})

const Message = model("message", MessageSchema);

export default Message;