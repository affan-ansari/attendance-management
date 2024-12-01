import { Response } from "express";
import { ApiRequest, AuthenticatedRequest, HttpException, HttpStatus } from "../common/interfaces";
import {
  buildErrorResponse,
  buildSuccessResponse,
  validateAllowedBodyParams,
  validateMandatoryQueryParams,
} from "../common/helpers";
import * as attendanceService from "../services/attendance-service";

export const punchIn = async (req: ApiRequest<AuthenticatedRequest>, res: Response) => {
  try {
    const { id: userId } = req.user;
    const attendance = await attendanceService.punchIn(userId);
    res.send(buildSuccessResponse(attendance));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const punchOut = async (req: ApiRequest<AuthenticatedRequest>, res: Response) => {
  try {
    const { id: userId } = req.user;
    const attendance = await attendanceService.punchOut(userId);
    res.send(buildSuccessResponse(attendance));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const applyLeave = async (req: ApiRequest<AuthenticatedRequest>, res: Response) => {
  try {
    const { id: userId } = req.user;
    const leaveAttendance = await attendanceService.applyLeave(userId);
    res.send(buildSuccessResponse(leaveAttendance));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const getMyAttendance = async (req: ApiRequest<AuthenticatedRequest>, res: Response) => {
  try {
    validateAllowedBodyParams(req.query, ["search", "attendanceStatus"]);

    const { id: userId } = req.user;
    const { search, attendanceStatus } = req.query;
    const attendances = await attendanceService.getAttendanceByUser(userId, { search, attendanceStatus });

    res.send(buildSuccessResponse(attendances));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};

export const getAttendanceByStatus = async (req: ApiRequest<AuthenticatedRequest>, res: Response) => {
  try {
    validateMandatoryQueryParams(req.query, ["status"]);
    const { status } = req.query;
    const attendances = await attendanceService.getAttendanceByStatus(status);
    res.send(buildSuccessResponse(attendances));
  } catch (error) {
    res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorResponse(error));
  }
};
