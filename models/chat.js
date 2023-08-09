import mongoose from "mongoose";

const chat_schema = mongoose.Schema({
  _id: String,
  chatName: String,
  isTeamChat: Boolean,
  employees: [
    {
      type: String,
      ref: "Employee",
    },
  ],
  latestMessage: {
    type: String,
    ref: "Message",
  },
  admins: [
    {
      type: String,
      ref: "Employee",
    },
  ],
});

const Chat = mongoose.model("Chat", chat_schema);
