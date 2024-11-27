import { IAttendanceData } from "../../components/user-dashboard-overview/user-dashboard-overview.types";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    totalHours: number;
    dailyAvgHours: number;
}

export interface IUsersResponse {
    status: string;
    data: IUserData[];
}

export interface IUserResponse {
    status: string;
    data: IAttendanceUser;
}

export interface IAttendanceUser {
    user: IUserData;
    attendance: IAttendanceData[];
}

export interface IUserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    designation: string;
    role: string;
    isFirstLogin: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface IAddEditUserResponse {
    status: string;
    data: object;
}
