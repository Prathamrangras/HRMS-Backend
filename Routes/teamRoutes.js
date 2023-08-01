import express from "express";
import {
  addMember,
  createTeam,
  deleteTeam,
  editTeam,
  getAllTeams,
  getTeam,
  getTeamByMemberId,
  removeMember,
} from "../controllers/team.js";

const router = express.Router();

router.get("/", getAllTeams);
router.get("/one/:memberID", getTeamByMemberId);

router.route("/:id").get(getTeam).delete(deleteTeam).patch(editTeam);

router.post("/create", createTeam);

router.patch("/add-member/:teamId", addMember);
router.patch("/remove-member/:teamId", removeMember);
router.patch("/assign-project/:teamId", removeMember);

export default router;
