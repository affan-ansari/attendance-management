import {
  CreateAdminUserBody,
  CreateUserBody,
  HttpException,
  HttpStatus,
  IUser,
  UpdateUserBody,
} from "../common/interfaces";
import { generateUsername } from "./utils";
import * as attendanceService from "../services/attendance-service";
const Users = require("../model/users");

export const getAllUsers = async (searchTerm?: string, position?: string) => {
  let query: Record<string, any> = {};
  if (position) {
    query.designation = position;
  }
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm.trim(), "i");
    query.$or = [
      { firstName: { $regex: searchRegex } },
      { lastName: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
    ];
  }
  try {
    const users = await Users.find(query).sort({ updatedAt: -1 });
    const usersWithHours = await Promise.all(
      users.map(async (user) => {
        const totalHours = await attendanceService.getTotalWorkedHours(user.id);
        const daysWorked = await attendanceService.getDaysWorked(user.id);
        const averageHours = daysWorked > 0 ? totalHours / daysWorked : 0;

        return {
          ...user.toJSON(),
          totalHoursWorked: Math.ceil(totalHours),
          dailyAverageHours: averageHours.toFixed(2),
        };
      })
    );
    return usersWithHours;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (id: string) => {
  const user = await Users.findById(id);
  if (!user) {
    throw new HttpException(HttpStatus.NOT_FOUND, "User not found.");
  }
  return user;
};

const getUserByEmailOrUsername = async (email: string, username: string) => {
  return await Users.findOne({
    $or: [{ username }, { email }],
  });
};

export const createAdminUser = async (params: CreateAdminUserBody) => {
  const { username, email } = params;

  const existingUser = await getUserByEmailOrUsername(email, username);

  if (existingUser) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "A user with this username or email already exists.");
  }

  const user = new Users({
    ...params,
    role: "admin",
    isFirstLogin: true,
    designation: "Administrator",
  });

  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    designation: user.designation,
    isFirstLogin: user.isFirstLogin,
  };
};

export const createUser = async (params: CreateUserBody) => {
  const { firstName, lastName, email } = params;
  const username = generateUsername(firstName, lastName, email);
  const existingUser = await getUserByEmailOrUsername(email, username);
  if (existingUser) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "A user with this username or email already exists.");
  }

  const user = new Users({
    ...params,
    username,
    pin: "5555",
    role: "user",
    isFirstLogin: false,
  });

  await user.save();

  return user.toJSON();
};

export const deleteUser = async (id: string) => {
  const user: IUser | null = await Users.findByIdAndDelete(id);
  if (!user) {
    throw new HttpException(HttpStatus.NOT_FOUND, "User not found.");
  }

  return user.toJSON();
};

export const updateUser = async (id: string, params: UpdateUserBody) => {
  const user: IUser | null = await Users.findByIdAndUpdate(
    id,
    { $set: params },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new HttpException(HttpStatus.NOT_FOUND, "User not found.");
  }

  return user.toJSON();
};
