const jwt = require("jsonwebtoken");
const Users = require("../model/users");

import { NextFunction, Response } from "express";
import { buildErrorResponse } from "../common/helpers";
import { ApiRequest, HttpException, HttpStatus } from "../common/interfaces";

export async function verifyToken(req: ApiRequest, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send(buildErrorResponse(new HttpException(HttpStatus.FORBIDDEN, "Access denied")));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.userId);
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send(buildErrorResponse(new HttpException(HttpStatus.BAD_REQUEST, "User not found")));
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function verifyAdmin(req: ApiRequest, res: Response, next: NextFunction) {
  if (req.user.role === "admin") {
    next();
  } else {
    res
      .status(HttpStatus.FORBIDDEN)
      .send(buildErrorResponse(new HttpException(HttpStatus.FORBIDDEN, "Access denied")));
  }
}
