import Employee from "../models/employee.js";
import { signToken } from "../utils/signtoken.js";

export const getJr = async (req, res) => {
  try {
    const { id } = req.params;
    const dataArr = await Employee.find({ managerId: { $in: [id] } });
    res.status(200).json(dataArr);
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
    const { CreatorId } = req.body;
    const Creator = await Employee.findOne({ id: CreatorId });
    const managerArr = Creator.managerId;
    req.body.employee.managerId = [...managerArr, CreatorId];
    const data = new Employee(req.body.employee);

    const result = await data.save();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Missing EmailId or Password",
    });
  }
  const user = await Employee.findOne({ email: email });

  console.log(user);

  if (user && (await user.matchPasswords(password))) {
    res.status(200).json({
      status: "success",
      token: signToken(user, "1h"),
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "invalid emailid or password",
    });
  }
};
