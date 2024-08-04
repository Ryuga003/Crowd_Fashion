import { Router } from "express";
import { singleUpload } from "../middlewares/multer.js";
import { CreateQuery, deleteQuery, fetchAllQuery, getQuery } from "../controllers/query.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();

router.post("/new", isAuthenticatedUser, singleUpload, CreateQuery);
router.get("/all", fetchAllQuery);
router.route("/:id").get(getQuery).delete(deleteQuery)
export default router;