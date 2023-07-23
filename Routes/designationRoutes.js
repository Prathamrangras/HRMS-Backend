import express from "express";
import Designation from "../models/designation.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const data = new Designation(req.body);
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
