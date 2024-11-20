import { Router } from "express";
import * as usersController from "../controllers/user-controller";
import * as homeController from "../controllers/index";
const router = Router();

router.get("/", homeController.helloFromServer);

// User routes
router.get("/users", usersController.getAllUsers);

export default router;
