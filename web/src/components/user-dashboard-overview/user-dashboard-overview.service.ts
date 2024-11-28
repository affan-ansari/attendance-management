import { toast } from "react-toastify";
import axiosInstance from "../../app/axios";
import { IMyAttendanceResponse } from "./user-dashboard-overview.types";

export const getMyAttendance = async () => {
    try {
        const response = await axiosInstance.get<IMyAttendanceResponse>(
            "/attendance/my-attendance"
        );
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const punchIn = async () => {
    try {
        await axiosInstance.post("/attendance/punch-in");
        toast.success("Punched in for today!");
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const applyForLeave = async () => {
    try {
        await axiosInstance.post("/attendance/apply-leave");
        toast.success("Applied for leave today!");
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};
