import express from "express";

const router = express.Router();

router.route("/").get(getChats).post(accessChats);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);
