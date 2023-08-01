import mongoose from "mongoose";

const access_schema = mongoose.Schema({
  _id: String,
  name: String,
  Type: Number,
});

const Access = mongoose.model("Access", access_schema);

export default Access;
