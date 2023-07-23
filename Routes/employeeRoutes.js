import express from "express";
import { createEmployee, getJr, login } from "../controllers/employee.js";

const router = express.Router();

router.get("/getJr/:id", getJr);

router.post("/create", createEmployee);

router.post("/login", login);

export default router;
