import jwt from "jsonwebtoken";

export const signToken = (obj, time) => {
  const token = jwt.sign({ obj }, "secret123", {
    expiresIn: time,
  });
  return token;
};
