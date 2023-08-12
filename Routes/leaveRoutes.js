import express from "express";
import {
  createLeave,
  deleteLeave,
  editLeave,
  getAllLeave,
  getLeave,
} from "../controllers/leave.js";

const router = express.Router();

router.post("/create", createLeave);

router.get("/", getAllLeave);

router.route("/:id").get(getLeave).patch(editLeave).delete(deleteLeave);

export default router;
