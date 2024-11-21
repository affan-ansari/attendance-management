import { Response } from "express";
import { ApiRequest, HttpException, LoginReqBody } from "../common/interfaces";
import * as authService from "../services/auth-service";
import {
  buildErrorResponse,
  buildSuccessResponse,
  validateMandatoryBodyParams,
} from "../common/helpers";

export const login = async (req: ApiRequest<LoginReqBody>, res: Response) => {
  try {
    validateMandatoryBodyParams(req.body, ["username", "pin"]);
    const { username, pin } = req.body;
    const data = await authService.login(username, pin);
    res.send(buildSuccessResponse(data));
  } catch (error) {
    res.status(error.statusCode).send(buildErrorResponse(error));
  }
};
