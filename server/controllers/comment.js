import { TryCatch } from "../middlewares/error.js";
import Comment from "../models/comment.js";


export const CreateComment = TryCatch(async (req, res, next) => {

    const { queryId } = req.body
    await Comment.create({
        createdBy: req.userId,
        productImage: req.file.filename,
        queryID: queryId
    })
    return res.status(200).json({
        message: "Query created successfully",
        success: true,
    });
})

export const FetchComments = TryCatch(async (req, res, next) => {
    const { id } = req.params
    const comments = await Comment.find({ queryID: id }).populate("createdBy");
    return res.status(200).json({
        message: "Query created successfully",
        success: true,
        data: comments,
    });
})

