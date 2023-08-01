import Employee from "../models/employee.js";
import Task from "../models/task.js";
import { genId } from "../utils/genId.js";

export const createTask = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      $and: [
        { _id: req.body.assignedto },
        { managerId: { $in: [req.body.assignedby] } },
      ],
    });
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        message: "You cannot assign a task to this employee",
      });
    }
    console.log(req.body);
    const data = await Task.create({ _id: genId(), ...req.body });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Task with the specific id
export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Task.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get Task with the specific id
export const getAllTasks = async (req, res) => {
  try {
    const data = await Task.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Task

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Task Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Task
export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const submitTask = async (req, res) => {};
