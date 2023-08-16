import Chats from "../models/chat.js";
import Employee from "../models/employee.js";

export const getChats = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { chatName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const chats = Chats.find(keyword).find({});
    res.status(200).json({
      status: "success",
      data: chats,
    });
  } catch (error) {
    console.log(error);
  }
};

export const accessChat = async (req, res) => {
  const { userid } = req.body;
  let data = await Chats.find({
    isTeamChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userid } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  data = await Employee.populate(data, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (data.length > 0) {
    res.send(data[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      employees: [req.user._id, userid],
    };

    try {
      const createdChat = await Chats.create(chatData);
      const FullChat = await Chats.findOne({ _id: createdChat._id }).populate(
        "employees",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};
