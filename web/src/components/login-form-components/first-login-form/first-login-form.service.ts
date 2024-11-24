import axiosInstance from "../../../app/axios";
import { FirstLoginFormTypes, IFirstLoginResponse } from "./first-login-form.types";

export const firstLogin = async (formData: FirstLoginFormTypes) => {
    try {
        await axiosInstance.post<IFirstLoginResponse>("/first-login", {
            pin: formData.pin,
        });
        return true;
    } catch (error) {
        return false;
    }
};
