import express from "express";
import mongoose from "mongoose";
import designationRoutes from "./Routes/designationRoutes.js";
import employeeRoutes from "./Routes/employeeRoutes.js";
import positionRoutes from "./Routes/positionRoutes.js";
import departmentRoutes from "./Routes/departmentRoutes.js";
import "dotenv/config";

const port = process.env.PORT || 5000;

const app = express();

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

const server = app.listen(port, () => {
  console.log("server started");
});
