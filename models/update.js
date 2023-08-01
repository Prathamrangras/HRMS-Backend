import mongoose from "mongoose";

const update_schema = mongoose.Schema(
  {
    _id: String,
    ProjectID: {
      type: String,
      ref: "Project",
    },
    updateBy: {
      type: String,
      ref: "Employee",
    },
    description: String,
    documents: String,
  },
  { timestamps: true }
);
