import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import { CreateComment, FetchComments } from "../controllers/comment.js";

const router = Router();

router.post("/new", isAuthenticatedUser, singleUpload, CreateComment);
router.get("/:id", FetchComments);


export default router;