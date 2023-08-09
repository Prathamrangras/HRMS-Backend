import Project from "../models/project.js";
import Team from "../models/team.js";
import { genId } from "../utils/genId.js";

//create a new Project
export const createProject = async (req, res) => {
  try {
    const data = await Project.create({ _id: genId(), ...req.body });

    await Team.findByIdAndUpdate(
      req.body.teamAssigned,
      {
        projectAssigned: data._id,
      },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Project with the specific id
export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Project.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get Project with the specific id
export const getAllProjects = async (req, res) => {
  try {
    const data = await Project.find({})
      .populate("Category")
      .populate("teamAssigned");
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Project

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Project Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Project
export const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Project.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
