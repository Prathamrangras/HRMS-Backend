import express from "express";
import {
  getChats,
  accessChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controllers/chat.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.route("/").get(checkToken, getChats).post(checkToken, accessChat);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);

export default router;
