import express from "express";
import {
  createaccess,
  deleteaccess,
  editaccess,
  getAllaccesss,
  getaccess,
  giveAccess,
} from "../controllers/access.js";

const router = express.Router();

router.get("/", getAllaccesss);

router.route("/:id").get(getaccess).patch(editaccess).delete(deleteaccess);

router.post("/create", createaccess);

router.post("/grant", giveAccess);

export default router;
