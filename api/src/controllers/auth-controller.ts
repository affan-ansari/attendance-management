import { Response } from "express";
import { ApiRequest, FirstLoginReqBody, HttpException, HttpStatus, LoginReqBody } from "../common/interfaces";
import * as authService from "../services/auth-service";
import { buildErrorResponse, buildSuccessResponse, validateMandatoryBodyParams } from "../common/helpers";

export const login = async (req: ApiRequest<LoginReqBody>, res: Response) => {
  try {
    validateMandatoryBodyParams(req.body, ["username", "pin"]);
    const { username, pin } = req.body;
    const data = await authService.login(username, pin);
    res.send(buildSuccessResponse(data));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const firstLogin = async (req: ApiRequest<FirstLoginReqBody>, res: Response) => {
  try {
    validateMandatoryBodyParams(req.body, ["pin"]);
    const { pin } = req.body;
    const { username } = req.user;
    const data = await authService.firstLogin(username, pin);
    res.send(buildSuccessResponse(data));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};
