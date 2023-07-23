import department from "../models/department.js";
import Postition from "../models/position.js";

//create a new department
export const createdepartment = async (req, res) => {
  const { departmentId, departmentName } = req.body;

  try {
    const data = await department.create({
      id: departmentId,
      name: departmentName,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get department with the specific id
export const getdepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const data = department.findOne({ id: id });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//get positions with specific id of department
export const getPositionsBydepartment = async (req, res) => {
  try {
    const { deptId } = req.params;
    const data = await Postition.find({ departmentId: deptId });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get department with the specific id
export const getAlldepartments = async (req, res) => {
  try {
    const data = await department.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a department

export const deletedepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await department.deleteOne({ id: id });
    res
      .status(200)
      .json({ status: "success", message: "department Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update department
export const editdepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await department.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "department updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
