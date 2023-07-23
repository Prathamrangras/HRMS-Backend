import Position from "../models/position.js";

//create a new position
export const createPosition = async (req, res) => {
  const { departmentId, positionId, positionName } = req.body;

  try {
    const data = await Position.create({
      id: positionId,
      departmentId: departmentId,
      name: positionName,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get position with the specific id
export const getPosition = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Position.findOne({ id: id });
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get position with the specific id
export const getAllPositions = async (req, res) => {
  try {
    const data = await Position.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a position

export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await Position.deleteOne({ id: id });
    res
      .status(200)
      .json({ status: "success", message: "Position Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update position
export const editPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Position.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Position updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
