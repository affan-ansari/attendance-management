import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../app/axios";
import { ILoginResponse, LoginFormTypes } from "./login-form.types";

export const login = async (formData: LoginFormTypes) => {
    const response = await axiosInstance.post<ILoginResponse>("/login", {
        username: formData.username,
        pin: formData.pin,
    });
    localStorage.setItem("token", response.data.data.token);
    return response.data.data.user;
};

export const logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem("token");
    navigate("/login");
};
