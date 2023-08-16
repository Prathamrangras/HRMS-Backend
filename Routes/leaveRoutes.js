import express from "express";
import {
  createLeave,
  deleteLeave,
  editLeave,
  getAllLeave,
  getLeave,
  leaveRequest,
} from "../controllers/leave.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/create", createLeave);

router.route("/").get(getAllLeave).post(checkToken, leaveRequest);

router.route("/:id").get(getLeave).patch(editLeave).delete(deleteLeave);

export default router;
