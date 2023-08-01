import express from "express";
import {
  createEmployee,
  getJr,
  login,
  getEmployeeByID,
} from "../controllers/employee.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);

// router.use(checkToken);

router.get("/getJr", checkToken, getJr);
router.get("/:id", checkToken, getEmployeeByID);

router.post("/create", createEmployee);

export default router;
