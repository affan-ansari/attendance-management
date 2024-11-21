const jwt = require("jsonwebtoken");

import { NextFunction, Response } from "express";
import { buildErrorResponse } from "../common/helpers";
import { ApiRequest, HttpException, HttpStatus } from "../common/interfaces";

function verifyToken(req: ApiRequest, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .send(
        buildErrorResponse(
          new HttpException(HttpStatus.FORBIDDEN, "Access denied")
        )
      );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;