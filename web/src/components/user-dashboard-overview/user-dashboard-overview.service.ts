import axiosInstance from "../../app/axios";
import { IMyAttendanceResponse } from "./user-dashboard-overview.types";

export const getMyAttendance = async () => {
    const response = await axiosInstance.get<IMyAttendanceResponse>("/attendance/my-attendance");
    return response.data.data;
};

export const punchIn = async () => {
    await axiosInstance.post("/attendance/punch-in");
};

export const applyForLeave = async () => {
    await axiosInstance.post("/attendance/apply-leave");
};
