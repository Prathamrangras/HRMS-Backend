import mongoose from "mongoose";

const team_schema = mongoose.Schema({
  _id: String,
  name: String,
  members: [
    {
      type: String,
      ref: "Employee",
    },
  ],
  teamLeaderID: {
    type: String,
    ref: "Employee",
  },
  projectAssigned: {
    type: String,
    default: null,
    ref: "Project",
  },
  chatGroup: {
    type: String,
    ref: "Chat",
  },
});

const Team = mongoose.model("Team", team_schema);

export default Team;
