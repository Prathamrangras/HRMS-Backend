import mongoose from "mongoose";

const chat_schema = mongoose.Schema(
  {
    _id: String,
    chatName: {
      type: String,
      trim: true,
    },
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
  },
  { timestamps: true }
);

chat_schema.index({ createdAt: -1 });
chat_schema.index({ updatedAt: -1 });

const Chat = mongoose.model("Chat", chat_schema);

export default Chat;
