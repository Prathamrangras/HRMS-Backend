import mongoose from "mongoose";

const task_schema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    title: String,
    lastDate: Date,
    submission: {
      type: Date,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    assignedto: {
      type: String,
      ref: "Employee",
    },
    assignedby: {
      type: String,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", task_schema);

export default Task;
