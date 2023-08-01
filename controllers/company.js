import Company from "../models/company.js";
import { genId } from "../utils/genId.js";

//create a new Company
export const createCompany = async (req, res) => {
  try {
    const data = await Company.create({ _id: genId(), ...req.body });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Company with the specific id
export const getCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Company.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get Company with the specific id
export const getAllCompanys = async (req, res) => {
  try {
    const data = await Company.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Company

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Company Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Company
export const editCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Company.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Company updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

//get super admin of company

export const superAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Company.findById(id).populate({
      path: "sudo",
      select: "-password",
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
