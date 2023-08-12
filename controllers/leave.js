import Leave from "../models/leave.js";
import { genId } from "../utils/genId.js";

//create leave
export const createLeave = async (req, res) => {
  try {
    const currentDate = new Date();
    const inputFromDate = new Date(req.body.fromDate);
    if (inputFromDate < currentDate) {
      return res
        .status(400)
        .json({ status: "error", message: "From date cannot be in the past" });
    }
    const data = await Leave.create({ _id: genId(), ...req.body });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//get leave with specific id
export const getLeave = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Leave.findById(id).populate(
      "employeeId",
      "employeeName",
      "image"
    );
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//get all leave
export const getAllLeave = async (req, res) => {
  try {
    const data = await Leave.find({}).populate(
      "employeeId",
      "employeeName",
      "image"
    );
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a leave
export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    await Leave.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Leave Deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update leave
export const editLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Leave.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Leave updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};