import axiosInstance from "../../app/axios";

import { IAddEditUserForm } from "./manage-users/add-edit-modal/add-edit-modal.types";
import {
    IAddEditUserResponse,
    IUserResponse,
    IUsersResponse,
} from "./admin-dashboard-overview.types";
import { IAttendanceByStatusResponse } from "./availability-tables/availability-table-card/availability-table-card.types";
import { toast } from "react-toastify";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get<IUsersResponse>("/users");
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const getUser = async (userId: string) => {
    try {
        const response = await axiosInstance.get<IUserResponse>(`/users/${userId}`);
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const deletedUser = await axiosInstance.delete(`/users/delete-user/${userId}`);
        toast.success(`User of id: ${userId} deleted successfully`);
        return deletedUser;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const editUser = async (userId: string, formData: IAddEditUserForm) => {
    try {
        const response = await axiosInstance.put<IAddEditUserResponse>(
            `/users/update-user/${userId}`,
            {
                ...formData,
            }
        );
        toast.success(`User of id: ${userId} updated successfully`);
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const addUser = async (formData: IAddEditUserForm) => {
    try {
        const response = await axiosInstance.post<IAddEditUserResponse>("/users/create-user", {
            ...formData,
        });
        toast.success("User created successfully");
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const getAttendanceByStatus = async (status: string) => {
    const response = await axiosInstance.get<IAttendanceByStatusResponse>(
        `attendance/?status=${status}`
    );
    return response.data.data;
};
