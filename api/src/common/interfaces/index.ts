import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Document, Types } from "mongoose";

export interface ApiRequest<TBody = {}, QParams = { [key: string]: any }>
  extends Request<ParamsDictionary, any, TBody, QParams> {
  body: TBody;
  session?: any;
  user?: IUser;
  query: QParams;
}

export interface ApiResponse {
  status: ApiResponseStatus;
  data?: unknown;
  message?: string;
  stack?: string;
  errors?: unknown;
}

export enum ApiResponseStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export class HttpException extends Error {
  statusCode: HttpStatus;
  errors?: ValidationErrors;
  constructor(statusCode: number, message: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export interface ValidationErrors {
  [key: string]: string[];
}

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export interface LoginReqBody {
  username: string;
  pin: string;
}
export interface AuthenticatedRequest {
  user: IUser;
}

export interface FirstLoginReqBody extends AuthenticatedRequest {
  pin: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  pin: string;
  designation: string;
  role: "user" | "admin";
  isFirstLogin: boolean;
}

export interface IAttendance extends Document {
  user: Types.ObjectId;
  status: "present" | "leave" | "absent";
  date: Date;
  punchIn: Date;
  punchOut: Date;
}

export interface CreateAdminUserBody {
  username: string;
  email: string;
  pin: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
}

export interface UpdateUserBody {
  email?: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
}
