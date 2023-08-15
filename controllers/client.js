import Client from "../models/client.js";
import { genId } from "../utils/genId.js";
import Email from "../utils/email.js";

//create a new Client
export const createClient = async (req, res) => {
  try {
    const data = await Client.create({ _id: genId(), ...req.body });

    const url = "http://localhost/3000/login";
    new Email(req.body, url).sendWelcome(data.email, req.body.password);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// get Client with the specific id
export const getClient = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Client.findById(id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

// get Client with the specific id
export const getAllClients = async (req, res) => {
  try {
    const data = await Client.find({});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//delete a Client

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Client Delted successfully" });
  } catch (error) {
    console.log(error);
  }
};

//update Client
export const editClient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Client.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Client updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
