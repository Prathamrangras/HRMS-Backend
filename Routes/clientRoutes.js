import express from "express";
import {
  createClient,
  deleteClient,
  editClient,
  getAllClients,
  getClient,
} from "../controllers/client.js";

const router = express.Router();

router.get("/", getAllClients);

router.route("/:id").get(getClient).patch(editClient).delete(deleteClient);

router.post("/create", createClient);

export default router;
