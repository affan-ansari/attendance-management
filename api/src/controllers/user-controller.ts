import { Response } from "express";
import {
  ApiRequest,
  CreateAdminUserBody,
  CreateUserBody,
  HttpStatus,
  UpdateUserBody,
} from "../common/interfaces";
import * as usersService from "../services/user-service";
import * as attendanceService from "../services/attendance-service";
import {
  buildErrorResponse,
  buildSuccessResponse,
  validateAllowedBodyParams,
  validateMandatoryBodyParams,
} from "../common/helpers";

export const getAllUsers = async (req: ApiRequest, res: Response) => {
  validateAllowedBodyParams(req.query, ["search", "position"]);
  const { search, position } = req.query;
  const data = await usersService.getAllUsers(search, position);
  res.send(buildSuccessResponse(data));
};

export const getUserById = async (req: ApiRequest, res: Response) => {
  try {
    validateAllowedBodyParams(req.query, ["search", "attendanceStatus"]);
    const { search, attendanceStatus } = req.query;
    const user = await usersService.getUserById(req.params.id);
    const attendance = await attendanceService.getAttendanceByUser(req.params.id, {
      search,
      attendanceStatus,
    });
    res.send(buildSuccessResponse({ user, attendance }));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const createAdminUser = async (req: ApiRequest<CreateAdminUserBody>, res: Response) => {
  try {
    validateMandatoryBodyParams(req.body, ["username", "email", "firstName", "lastName", "pin"]);
    const { username, email, firstName, lastName, pin } = req.body;
    const adminUser = await usersService.createAdminUser({ username, email, firstName, lastName, pin });
    res.send(buildSuccessResponse(adminUser));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const createUser = async (req: ApiRequest<CreateUserBody>, res: Response) => {
  try {
    validateMandatoryBodyParams(req.body, ["email", "firstName", "lastName", "designation"]);
    const { email, firstName, lastName, designation } = req.body;
    const user = await usersService.createUser({ email, firstName, lastName, designation });
    res.send(buildSuccessResponse(user));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};
export const updateUser = async (req: ApiRequest<UpdateUserBody>, res: Response) => {
  try {
    validateAllowedBodyParams(req.body, ["email", "firstName", "lastName", "designation"]);
    const { id } = req.params;
    const { email, firstName, lastName, designation } = req.body;
    const updatedUser = await usersService.updateUser(id, { email, firstName, lastName, designation });
    res.send(buildSuccessResponse(updatedUser));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};
export const deleteUser = async (req: ApiRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await usersService.deleteUser(id);
    res.send(buildSuccessResponse(deletedUser));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};
