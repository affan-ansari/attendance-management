import { HttpException, HttpStatus } from "../common/interfaces";

const Users = require("../model/users");
const jwt = require("jsonwebtoken");

export const login = async (username: string, pin: string) => {
  const user = await Users.findOne({ username: username });
  if (!user) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");
  } else if (user.pin !== pin) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");
  } else {
    return assignToken(user);
  }
};

const assignToken = (user: any) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return {
    user: user,
    token: token,
  };
};
