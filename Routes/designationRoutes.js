import express from "express";
import {
  createDesignation,
  deleteDesignation,
  editDesignation,
  getAllDesignations,
  getDesignation,
} from "../controllers/designation.js";

const router = express.Router();

router.get("/", getAllDesignations);

router
  .route("/:id")
  .get(getDesignation)
  .patch(editDesignation)
  .delete(deleteDesignation);

router.post("/create", createDesignation);

export default router;
