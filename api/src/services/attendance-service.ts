import Attendance from "../model/attendance";
import { HttpException, HttpStatus, IAttendance, IUser, UpdateUserBody } from "../common/interfaces";
import { getUserById } from "./user-service";

export const punchIn = async (userId: string) => {
  const user = await getUserById(userId);
  const todayStart = getStartOfDay(new Date());
  const existingAttendance = await Attendance.findOne({
    user: userId,
    date: { $gte: todayStart },
  });
  console.log("Existing attendance: ", existingAttendance);
  if (existingAttendance)
    throw new HttpException(HttpStatus.BAD_REQUEST, "User has already punched in today.");

  const attendance = new Attendance({
    user: user,
    status: "present",
    date: todayStart,
    punchIn: new Date(),
  });

  return await attendance.save();
};

export const punchOut = async (userId: string) => {
  const todayStart = getStartOfDay(new Date());

  const attendance = await Attendance.findOne({
    user: userId,
    date: { $gte: todayStart },
  });
  validateAttendance(attendance);
  attendance.punchOut = new Date();
  return await attendance.save();
};

export const applyLeave = async (userId: string) => {
  await getUserById(userId);
  const todayStart = getStartOfDay(new Date());
  const existingAttendance = await Attendance.findOne({
    user: userId,
    date: { $gte: todayStart },
  });
  if (existingAttendance) {
    throw new HttpException(
      HttpStatus.BAD_REQUEST,
      `Attendance already exist of status: ${existingAttendance.status}`
    );
  }
  const attendance = new Attendance({
    user: userId,
    status: "leave",
    date: todayStart,
  });

  await attendance.save();
  return attendance;
};

export const getAttendanceByUser = async (userId: string) => {
  const attendances = await Attendance.find({ user: userId }).sort({ date: -1 });
  return attendances;
};

export const getAttendanceByStatus = async (status: string) => {
  if (!["present", "absent", "leave"].includes(status)) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "Invalid status filter.");
  }
  return Attendance.find({ status }).populate("user", "firstName lastName designation").sort({ date: -1 });
};

const getStartOfDay = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

const validateAttendance = (attendance: IAttendance) => {
  if (!attendance) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "User has not punched in today.");
  }
  if (!attendance.punchIn) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "User has not punched in today.");
  }
  if (attendance.punchOut) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "User has already punched out today.");
  }
};
