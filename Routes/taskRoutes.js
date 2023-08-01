import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", getAllTasks);

router.route("/:id").get(getTask).delete(deleteTask).patch(editTask);

router.post("/create", createTask);

export default router;
