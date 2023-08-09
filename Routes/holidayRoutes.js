import express from "express";
import {
  createHoliday,
  deleteHoliday,
  editHoliday,
  getAllHolidays,
  getHoliday,
} from "../controllers/holiday.js";

const router = express.Router();

router.get("/", getAllHolidays);

router.route("/:id").get(getHoliday).patch(editHoliday).delete(deleteHoliday);

router.post("/create", createHoliday);

export default router;
