export const EmployeeAcessCheck = (req, res, next) => {
  const employeeAcess = req.user.accessArray.find((e) => e.name === "employee");
  if (employeeAcess) {
    return next();
  }

  return res.status(403).json("permision denied");
};
