import express from "express";
import {
  createCompany,
  deleteCompany,
  editCompany,
  getAllCompanys,
  getCompany,
  superAdmin,
} from "../controllers/company.js";

const router = express.Router();

router.get("/", getAllCompanys);

router.route("/:id").get(getCompany).patch(editCompany).delete(deleteCompany);

router.post("/create", createCompany);

router.get("/sudo/:id", superAdmin);

export default router;
