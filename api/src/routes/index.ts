import { Router } from "express";
import * as usersController from "../controllers/user-controller";
import * as homeController from "../controllers/index";
import * as authController from "../controllers/auth-controller";
const verifyToken = require("../lib/authMiddleware");

const router = Router();

router.get("/", homeController.helloFromServer);

// User routes
router.get("/users", verifyToken, usersController.getAllUsers);

// Auth routes
router.post("/login", authController.login);

export default router;
