import mongoose from "mongoose";

const message_schema = mongoose.Schema(
  {
    _id: String,
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
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", message_schema);
export default Message;
