import mongoose from "mongoose";

const project_schema = mongoose.Schema({
  _id: String,
  name: String,
  Category: {
    type: String,
    ref: "Department",
  },
  clientID: {
    type: String,
    ref: "Client",
  },
  Photos: String,
  StartDate: Date,
  EndDate: Date,
  Budget: Number,
  Description: String,
  teamAssigned: {
    type: String,
    ref: "Team",
  },
  Priority: {
    type: String,
    enum: ["high", "low", "mid"],
  },

  Progress: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3],
  },
  updates: [
    {
      type: String,
      ref: "Update",
    },
  ],
});

const Project = mongoose.model("Project", project_schema);

export default Project;
