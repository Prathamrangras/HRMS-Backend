import Message from "../models/message.js";
import Employee from "../models/employee.js";
import Chat from "../models/chat.js";
import { genId } from "../utils/genId.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender")
      .populate("chat");
    res.status(200).json({ status: "success", data: messages });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Data",
      });
    }

    const newMessage = {
      _id: genId(),
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    // Use Promise.all for parallel population
    const [message, updatedChat] = await Promise.all([
      Message.create(newMessage)
        .then((message) => message.populate("sender", "name _id photo"))
        .then((message) => message.populate("chat"))
        .then((message) =>
          Employee.populate(message, {
            path: "chat.employees",
            select: "name photo email",
          })
        ),
      Chat.findByIdAndUpdate(chatId, {
        latestMessage: newMessage._id,
      }),
    ]);

    return res.json(message);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
