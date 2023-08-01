import mongoose from "mongoose";

const department_schema = mongoose.Schema({
  _id: {
    type: String,
  },
  Type: Number,
  name: String,
  DepartmentHead: {
    type: String,
    ref: "Employee",
  },
});

const Department = mongoose.model("Department", department_schema);

export default Department;
