import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { CreateMessage, FetchMessages } from "../controllers/message.js";

const router = Router();

router.post("/new", isAuthenticatedUser, CreateMessage);
router.get("/all", isAuthenticatedUser, FetchMessages);


export default router;