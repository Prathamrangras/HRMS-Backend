import Designation from "../models/designation.js";
import { genId } from "../utils/genId.js";

//create a new Designation
export const createDesignation = async (req, res) => {
  try {
    const data = await Designation.create({ _id: genId(), ...req.body });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Designation with the specific id
export const getDesignation = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Designation.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get Designation with the specific id
export const getAllDesignations = async (req, res) => {
  try {
    const data = await Designation.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Designation

export const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    await Designation.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Designation Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Designation
export const editDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Designation.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Designation updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
