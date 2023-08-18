import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/:chatId", checkToken, getMessages);
router.post("/", checkToken, sendMessage);

export default router;
