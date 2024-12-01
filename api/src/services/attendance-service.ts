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
  if (existingAttendance)
    throw new HttpException(HttpStatus.BAD_REQUEST, "User has already punched in today.");

  const currentHour = new Date().getHours();

  let status = "present";
  let punchOutTime = null;

  if (currentHour >= 18) {
    status = "absent";
  } else {
    punchOutTime = new Date(new Date().setHours(18, 0, 0, 0));
  }

  const attendance = new Attendance({
    user: user,
    status: status,
    date: todayStart,
    punchIn: new Date(),
    punchOut: punchOutTime,
  });

  return await attendance.save();
};

export const getTotalWorkedHours = async (userId: string): Promise<number> => {
  const attendances = await Attendance.find({
    user: userId,
    punchIn: { $exists: true },
    punchOut: { $exists: true },
  });

  let totalHours = 0;
  attendances.forEach((attendance) => {
    const punchIn = new Date(attendance.punchIn);
    const punchOut = new Date(attendance.punchOut);
    totalHours += (punchOut.getTime() - punchIn.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
  });

  return totalHours;
};

export const getDaysWorked = async (userId: string): Promise<number> => {
  const attendances = await Attendance.find({ user: userId, status: "present" });
  return attendances.length;
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

export const getAttendanceByUser = async (
  userId: string,
  filters: { search?: string; attendanceStatus?: string }
) => {
  const query: Record<string, any> = { user: userId };

  const { search, attendanceStatus } = filters;
  if (attendanceStatus) {
    query.status = attendanceStatus;
  }

  if (search) {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(search)) {
      throw new Error("Invalid search format. Expected MM/DD.");
    }

    const [monthStr, dayStr] = search.split("/");
    const month = parseInt(monthStr, 10) - 1; // Months are 0-indexed in JS Date
    const day = parseInt(dayStr, 10);
    const currentYear = new Date().getFullYear();

    const targetDate = new Date(currentYear, month, day);

    // Ensure the date is valid (e.g., not February 30)
    if (
      targetDate.getMonth() !== month ||
      targetDate.getDate() !== day ||
      targetDate.getFullYear() !== currentYear
    ) {
      throw new Error("Invalid date provided.");
    }

    // Define the start and end of the target day
    const startDate = getStartOfDay(targetDate);
    const endDate = getStartOfDay(targetDate);

    // Modify the query to filter attendances for the specific date
    query.date = { $gte: startDate, $lte: endDate };
  }

  const attendances = await Attendance.find(query).sort({ date: -1 });
  return attendances;
};

export const getAttendanceByStatus = async (status: string) => {
  if (!["present", "absent", "leave"].includes(status)) {
    throw new HttpException(HttpStatus.BAD_REQUEST, "Invalid status filter.");
  }
  const today = getStartOfDay(new Date());
  console.log(today);
  return Attendance.find({ status, date: { $eq: today } })
    .populate("user", "firstName lastName designation")
    .sort({ date: -1 });
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
