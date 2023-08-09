import express from "express";
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

const server = app.listen(port, () => {
  console.log("server started");
});
