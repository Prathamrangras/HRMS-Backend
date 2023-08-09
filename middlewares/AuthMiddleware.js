import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";

export const checkToken = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in or token provided is wrong",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const employee = await Employee.findById(decoded.obj._id)
      .select("-password")
      .populate("accessArray");
    if (!employee) {
      return res.status(401).json({
        status: "fail",
        message: "User belonging to this token does no longer exist",
      });
    }
    req.user = employee;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      error: error,
    });
  }
};
