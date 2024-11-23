import { HttpException, HttpStatus, IUser } from "../common/interfaces";

const Users = require("../model/users");
const jwt = require("jsonwebtoken");

export const login = async (username: string, pin: string) => {
  const user: IUser = await Users.findOne({ username: username });
  if (!user) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");
  } else if (user.pin !== pin) {
    throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");
  } else {
    return assignToken(user);
  }
};

export const firstLogin = async (username: string, pin: string) => {
  const user: IUser | null = await Users.findOne({ username: username });
  if (!user) {
    throw new HttpException(HttpStatus.NOT_FOUND, "User not found.");
  }
  if (user.isFirstLogin) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "First login process has already been completed.");
  }
  user.pin = pin;
  user.isFirstLogin = true;

  await user.save();

  return user.toJSON();
};

const assignToken = (user: IUser) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return {
    user: user.toJSON(),
    token: token,
  };
};
