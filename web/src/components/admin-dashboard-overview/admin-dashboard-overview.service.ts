import axiosInstance from "../../app/axios";

import { IEditUserForm } from "./manage-users/edit-modal/edit-modal.types";
import {
    IAddEditUserResponse,
    IUserResponse,
    IUsersResponse,
} from "./admin-dashboard-overview.types";
import { IAddUserForm } from "./manage-users/add-modal/add-modal.types";
import { IAttendanceByStatusResponse } from "./availability-tables/availability-table-card/availability-table-card.types";

export const getUsers = async () => {
    const response = await axiosInstance.get<IUsersResponse>("/users");
    return response.data.data;
};

export const getUser = async (userId: string) => {
    const response = await axiosInstance.get<IUserResponse>(`/users/${userId}`);
    return response.data.data;
};

export const deleteUser = async (userId: string) => {
    return await axiosInstance.delete(`/users/delete-user/${userId}`);
};

export const editUser = async (userId: string, formData: IEditUserForm) => {
    const response = await axiosInstance.put<IAddEditUserResponse>(`/users/update-user/${userId}`, {
        ...formData,
    });
    return response.data.data;
};

export const addUser = async (formData: IAddUserForm) => {
    const response = await axiosInstance.post<IAddEditUserResponse>("/users/create-user", {
        ...formData,
    });
    return response.data.data;
};

export const getAttendanceByStatus = async (status: string) => {
    const response = await axiosInstance.get<IAttendanceByStatusResponse>(
        `attendance/?status=${status}`
    );
    return response.data.data;
};
