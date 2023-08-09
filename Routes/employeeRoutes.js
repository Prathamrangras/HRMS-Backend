import express from "express";
import {
  createEmployee,
  getJr,
  login,
  getEmployeeByID,
} from "../controllers/employee.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";
import { EmployeeAcessCheck } from "../middlewares/acessMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.use(checkToken);

router.get("/getJr", getJr);
router.get("/:id", getEmployeeByID);

router.post("/create", createEmployee);

export default router;
