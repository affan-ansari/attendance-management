import axiosInstance from "../../app/axios";

import { toast } from "react-toastify";
import { IAddEditUserForm } from "./manage-users/add-edit-modal/add-edit-modal.types";
import { IAttendanceByStatusResponse } from "./availability-tables/availability-table-card/availability-table-card.types";
import {
    IAddEditUserResponse,
    IUserResponse,
    IUsersResponse,
} from "./admin-dashboard-overview.types";

export const getUsers = async (url: string) => {
    const paramsString = url.split("?")[1];
    const filterParams = getFilterParams(paramsString);
    try {
        const response = await axiosInstance.get<IUsersResponse>("/users", {
            params: filterParams,
        });
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const getUser = async (url: string) => {
    try {
        const [urlString, paramsString] = url.split("?");
        console.log(url);
        const filterParams = getFilterParams(paramsString);
        console.log("url: ", urlString, "filter: ", filterParams);
        const response = await axiosInstance.get<IUserResponse>(urlString, {
            params: filterParams,
        });
        return response.data.data;
    } catch (err) {
        const error = err as Error;
        toast.error(error.message);
    }
};

export const deleteUser = async (userId: string) => {
    const deletedUser = await axiosInstance.delete(`/users/delete-user/${userId}`);
    toast.success(`User of id: ${userId} deleted successfully`);
    return deletedUser;
};

export const editUser = async (userId: string, formData: IAddEditUserForm) => {
    const response = await axiosInstance.put<IAddEditUserResponse>(`/users/update-user/${userId}`, {
        ...formData,
    });
    return response?.data?.data;
};

export const addUser = async (formData: IAddEditUserForm) => {
    const response = await axiosInstance.post<IAddEditUserResponse>("/users/create-user", {
        ...formData,
    });
    return response?.data?.data;
};

export const getAttendanceByStatus = async (status: string) => {
    const response = await axiosInstance.get<IAttendanceByStatusResponse>(
        `attendance/?status=${status}`
    );
    return response.data.data;
};

// Service helper methods

const getFilterParams = (paramsString: string) => {
    let filterParams: Record<string, string> = {};
    const params = new URLSearchParams(paramsString);
    for (let [key, value] of params.entries()) {
        if (value) filterParams[key] = value;
    }
    return filterParams;
};
