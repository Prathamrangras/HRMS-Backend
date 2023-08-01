import express from "express";
import {
  createdepartment,
  deletedepartment,
  editdepartment,
  getAlldepartments,
  getPositionsBydepartment,
  getdepartment,
} from "../controllers/department.js";

const router = express.Router();

router.get("/", getAlldepartments);

router
  .route("/:id")
  .get(getdepartment)
  .patch(editdepartment)
  .delete(deletedepartment);

router.get("/pos/:type", getPositionsBydepartment);

router.post("/create", createdepartment);

export default router;
