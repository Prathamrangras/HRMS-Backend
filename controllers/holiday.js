import Holiday from "../models/holiday.js";
import { genId } from "../utils/genId.js";

//create a new Holiday
export const createHoliday = async (req, res) => {
  try {
    const data = await Holiday.create({ _id: genId(), ...req.body });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Holiday with the specific id
export const getHoliday = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Holiday.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get all Holidays
export const getAllHolidays = async (req, res) => {
  try {
    const data = await Holiday.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Holiday

export const deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    await Holiday.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Holiday Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Holiday
export const editHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Holiday.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Holiday updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
