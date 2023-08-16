import mongoose from "mongoose";

const message_schema = mongoose.Schema({
  sender: {
    type: String,
    ref: "Employee",
  },
  content: String,
  chat: {
    type: String,
    ref: "Chat",
  },
  readBy: [
    {
      type: String,
      ref: "Employee",
    },
  ],
});
