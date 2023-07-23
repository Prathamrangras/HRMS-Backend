import mongoose from "mongoose";

const position_schema = mongoose.Schema(
  {
    id: String,
    departmentId: String,
    name: String,
  },
  { timestamps: true }
);

const Postition = mongoose.model("Position", position_schema);

export default Postition;
