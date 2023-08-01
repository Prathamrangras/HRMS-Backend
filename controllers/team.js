import Employee from "../models/employee.js";
import Team from "../models/team.js";
import { genId } from "../utils/genId.js";

export const createTeam = async (req, res) => {
  try {
    console.log(req.body);
    const data = await Team.create({
      _id: genId(),
      members: [req.body.teamLeaderID],
      ...req.body,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Team with the specific id
export const getTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Team.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get Team with the specific id
export const getAllTeams = async (req, res) => {
  try {
    const data = await Team.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Team

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Team Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Team
export const editTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Team.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Team updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMember = async (req, res) => {
  try {
    const { memberID } = req.body;

    const { teamId } = req.params;
    const data = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: { members: memberID },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Team Member Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeMember = async (req, res) => {
  try {
    const { memberID } = req.body;
    const { teamId } = req.params;
    const data = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: memberID },
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Team Member Removed Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const assignProject = async (req, res) => {
  try {
    const { projectID } = req.body;
    const { teamId } = req.params;
    const data = await Team.findByIdAndUpdate(
      teamId,
      {
        projectAssigned: projectID,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Project Assigned Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//get team with employee id

export const getTeamByMemberId = async (req, res) => {
  try {
    const { memberID } = req.params;

    const data = await Team.findOne({ members: { $in: [memberID] } }).populate(
      "projectAssigned"
    );

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
