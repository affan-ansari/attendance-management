import { Router } from "express";
import * as usersController from "../controllers/user-controller";
import * as homeController from "../controllers/index";
import * as authController from "../controllers/auth-controller";
import * as attendanceController from "../controllers/attendance-controller";
import { verifyToken, verifyAdmin } from "../lib/authMiddleware";

const router = Router();

router.get("/", homeController.helloFromServer);

// User routes
router.get("/users/:id", verifyToken, usersController.getUserById);
router.get("/users", verifyToken, verifyAdmin, usersController.getAllUsers);
router.post("/users/create-user", verifyToken, verifyAdmin, usersController.createUser);
router.delete("/users/delete-user/:id", verifyToken, verifyAdmin, usersController.deleteUser);
router.put("/users/update-user/:id", verifyToken, verifyAdmin, usersController.updateUser);
router.post("/users/create-admin-user", usersController.createAdminUser); // ONLY FOR INTERNAL USE
// router.post("/users/create-user", usersController.createUser);

// Auth routes
router.post("/login", authController.login);
router.post("/first-login", verifyToken, authController.firstLogin);

// Attendance routes
router.post("/attendance/punch-in", verifyToken, attendanceController.punchIn);
router.post("/attendance/punch-out", verifyToken, attendanceController.punchOut);
router.get("/attendance/my-attendance", verifyToken, attendanceController.getMyAttendance);
router.post("/attendance/apply-leave", verifyToken, attendanceController.applyLeave);

router.get("/attendance", verifyToken, verifyAdmin, attendanceController.getAttendanceByStatus);

export default router;
