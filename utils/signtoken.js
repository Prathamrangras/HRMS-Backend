import jwt from "jsonwebtoken";

export const signToken = (obj, time) => {
  const token = jwt.sign({ obj }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
  return token;
};
