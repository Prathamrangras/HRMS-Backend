import mongoose from "mongoose";

const task_schema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    title: String,
    StartDate: Date,
    EndDate: Date,
    submission: {
      type: Date,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    Project: {
      type: String,
      ref: "Project",
    },
    assignedto: {
      type: String,
      ref: "Employee",
    },
    assignedby: {
      type: String,
      ref: "Employee",
    },
    Progress: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3],
    },
    clientID: {
      type: String,
      ref: "Client",
    },
    Priority: {
      type: String,
      enum: ["mid", "high", "low"],
    },
    updates: [
      {
        type: String,
        ref: "Update",
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", task_schema);

export default Task;
