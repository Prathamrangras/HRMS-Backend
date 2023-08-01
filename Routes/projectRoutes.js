import express from "express";
import {
  createProject,
  deleteProject,
  editProject,
  getAllProjects,
  getProject,
} from "../controllers/project.js";

const router = express.Router();

router.get("/", getAllProjects);

router.route("/:id").get(getProject).patch(editProject).delete(deleteProject);

router.post("/create", createProject);
router.patch("/team");

export default router;
