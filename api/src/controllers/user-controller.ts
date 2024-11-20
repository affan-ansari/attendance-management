import { Response } from "express";
import { ApiRequest } from "../common/interfaces";
import * as usersService from "../services/user-service";
import { buildSuccessResponse } from "../common/helpers";

export const getAllUsers = async (req: ApiRequest, res: Response) => {
  const data = await usersService.getAllUsers();
  res.send(buildSuccessResponse(data));
};

export const getUserById = async (req: ApiRequest, res: Response) => {
  const data = await usersService.getUserById(req.params.id);
  res.send(buildSuccessResponse(data));
};
