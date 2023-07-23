import express from "express";
import {
  createPosition,
  deletePosition,
  editPosition,
  getAllPositions,
  getPosition,
} from "../controllers/position.js";

const router = express.Router();

router.get("/", getAllPositions);

router
  .route("/:id")
  .get(getPosition)
  .patch(editPosition)
  .delete(deletePosition);

router.post("/create", createPosition);

export default router;
