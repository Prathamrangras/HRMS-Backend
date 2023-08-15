import mongoose from "mongoose";

const leave_schema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    employeeId: {
      type: String,
      ref: "Employee",
    },
    leaveType: {
      type: String,
      enum: ["Casual Leave", "Medical leave"],
      default: "Casual Leave",
    },
    fromDate: Date,
    toDate: Date,
    reason: String,
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leave_schema);

export default Leave;
