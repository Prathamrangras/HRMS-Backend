import mongoose from "mongoose";

const task_schema = mongoose.Schema({
  _id: {
    type: String,
  },
  title: String,
  dueDate: Date,
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
    default: null,
  },
  assignedby: {
    type: String,
    ref: "Employee",
  },
});

const Task = mongoose.model("Task", task_schema);

export default Task;
