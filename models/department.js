import mongoose from "mongoose";

const department_schema = mongoose.Schema({
  id: String,
  name: String,
});

const Department = mongoose.model("Department", department_schema);

export default Department;
