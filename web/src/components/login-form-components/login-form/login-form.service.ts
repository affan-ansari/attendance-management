import axiosInstance from "../../../app/axios";
import { ILoginResponse, LoginFormTypes } from "./login-form.types";

export const login = async (formData: LoginFormTypes) => {
    const response = await axiosInstance.post<ILoginResponse>("/login", {
        username: formData.username,
        pin: formData.pin,
    });
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    return response.data.data.user;
};

export const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
};
