import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";

const middleware = require("express").Router();

middleware.use(morgan("dev"));
middleware.use(function (req: Request, res: Response, next: NextFunction) {
  // Stops malformed requests (such as /%FF)
  let err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) return res.redirect("/404");
  next();
});

// CORS
middleware.use(cors({ origin: "*" }));
middleware.use(compression());

// Parsing the body
middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({ extended: true }));

module.exports = middleware;
