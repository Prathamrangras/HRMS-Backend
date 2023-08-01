import access from "../models/access.js";
import { genId } from "../utils/genId.js";
import employee from "../models/employee.js";

export const createaccess = async (req, res) => {
  try {
    const data = await access.create({
      _id: genId(),
      ...req.body,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get access with the specific id
export const getaccess = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await access.findById(id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//get positions with specific type of access
export const getPositionsByaccess = async (req, res) => {
  try {
    const { type } = req.params;
    const data = await Position.find({ accessType: type });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get access with the specific id
export const getAllaccesss = async (req, res) => {
  try {
    const data = await access.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a access

export const deleteaccess = async (req, res) => {
  try {
    const { id } = req.params;
    await access.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "access Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update access
export const editaccess = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await access.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "access updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const giveAccess = async (req, res) => {
  try {
    /*one thing yet to be implemented where we have to check the id  
      of the user who is giving access whether he is manager of the one below him and can he give that access 
      to the employee with employeeId 
    */

    const { accessId, employeeId } = req.body;
    const data = await employee.findByIdAndUpdate(
      employeeId,
      {
        $push: { accessArray: accessId },
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "access granted",
    });
  } catch (error) {
    console.log(error);
  }
};
