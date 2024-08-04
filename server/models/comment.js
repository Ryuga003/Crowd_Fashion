import { Schema, model } from "mongoose";


const CommentSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',

    },
    queryID: {
        type: Schema.Types.ObjectId,
        ref: 'query',

    },
    productImage: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const Comment = model("comment", CommentSchema);

export default Comment;