import { Schema, model } from "mongoose";


const QuerySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    coverImage: {
        type: String,
        default: "DefaultImage.png",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true,
})

const Query = model("query", QuerySchema);

export default Query;