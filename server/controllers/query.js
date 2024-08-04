import { TryCatch } from "../middlewares/error.js";
import Query from "../models/query.js";

export const CreateQuery = TryCatch(async (req, res, next) => {

    const { title, description } = req.body;

    await Query.create({
        title,
        description,
        coverImage: req.file.filename,
        createdBy: req.userId
    })

    return res.status(200).json({
        message: "Query created successfully",
        success: true,
    });
});
export const fetchAllQuery = TryCatch(async (req, res, next) => {

    const data = await Query.find({});

    return res.status(200).json({
        message: "Query created successfully",
        success: true,
        data: data
    });
});
export const getQuery = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const data = await Query.findById({ _id: id }).populate("createdBy");

    return res.status(200).json({
        message: "Query fetched successfully",
        success: true,
        data: data
    });
});
export const deleteQuery = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    await Query.deleteOne({ _id: id });
    return res.status(200).json({
        message: "Query deleted successfully",
        success: true,
    });
});