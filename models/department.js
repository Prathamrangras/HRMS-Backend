import mongoose from "mongoose";

const department_schema = mongoose.Schema({
  _id: {
    type: String,
  },
  Type: Number,
  name: String,
});

const Department = mongoose.model("Department", department_schema);

export default Department;
