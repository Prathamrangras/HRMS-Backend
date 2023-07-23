import mongoose from "mongoose";

const designation_schema = new mongoose.Schema(
  {
    name: String,
    Type: Number,
  },
  { timestamps: true }
);

const Designation = mongoose.model("Designation", designation_schema);

export default Designation;
