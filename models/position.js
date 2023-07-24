import mongoose from "mongoose";
const position_schema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    departmentType: Number,
    Type: Number,
    name: String,
  },
  { timestamps: true }
);

const Postition = mongoose.model("Position", position_schema);

export default Postition;
