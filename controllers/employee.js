import Employee from "../models/employee.js";
import { signToken } from "../utils/signtoken.js";
import { v4 as uuidv4 } from "uuid";
import Email from "../utils/email.js";

export const getJr = async (req, res) => {
  try {
    const id = req.user._id;
    const dataArr = await Employee.find({ managerId: { $in: [id] } }).populate(
      "designationID"
    );
    res.status(200).json(dataArr);
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeByID = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Employee.findById(id);
    res.status(200).json({ employee: data });
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = async (req, res) => {
  try {
    /*add managerId of creator that is current user
     to managerId array of user created in this query
     and then push the creators id also
    */
    console.log(req.body);

    const { CreatorId } = req.body;
    const Creator = await Employee.findById(CreatorId);
    const id = uuidv4();
    console.log(CreatorId);
    const managerArr = Creator.managerId;
    req.body.employee._id = id;
    req.body.employee.managerId = [...managerArr, CreatorId];
    const data = new Employee(req.body.employee);

    const result = await data.save();

    const url = "http://localhost/3000/login";
    await new Email(req.body.employee, url).sendWelcome(
      result.email,
      req.body.employee.password
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        message: "Missing EmailId or Password",
      });
    }
    const user = await Employee.findOne({ email: email });

    if (user && (await user.matchPasswords(password))) {
      delete user["password"];
      res.status(200).json({
        status: "success",
        user,
        token: signToken(user, "30d"),
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "invalid emailid or password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
