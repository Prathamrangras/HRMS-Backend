import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import designationRoutes from "./Routes/designationRoutes.js";
import employeeRoutes from "./Routes/employeeRoutes.js";
import positionRoutes from "./Routes/positionRoutes.js";
import departmentRoutes from "./Routes/departmentRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import accessRoutes from "./Routes/accessRoutes.js";
import companyRoutes from "./Routes/companyRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import holidayRoutes from "./Routes/holidayRoutes.js";
import teamRoutes from "./Routes/teamRoutes.js";
import leaveRoutes from "./Routes/leaveRoutes.js";
import clientRoutes from "./Routes/clientRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT || 5000;

const app = express();

app.enable("trust proxy");

app.use(cors());

app.options("*", cors());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection completed");
  })
  .catch((e) => console.log(e));

app.use("/api/designation", designationRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/position", positionRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/designation", designationRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.all("*", (req, res) => res.json("Not Valid"));

const server = app.listen(port, () => {
  console.log("server started");
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("setup", (employeeData) => {
    socket.join(employeeData._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("joined chat " + room);
  });

  socket.on("new-message", (newMessageRecieved) => {
    var chat = newMessageRecieved.data.chat;
    console.log(newMessageRecieved.data);
    if (!chat.employees) return console.log("chat.users not defined");

    chat.employees.forEach((user) => {
      console.log(user.name);
      if (user._id == newMessageRecieved.data.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
