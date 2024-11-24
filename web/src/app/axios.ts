import axios, { AxiosError, AxiosResponse } from "axios";
import { IErrorResponse } from "./common.types";
import { logout } from "../components/login-form-components/login-form/login-form.service";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<IErrorResponse>) => {
        if (error.response) {
            const { status, message } = error.response.data;
            if (message === "Invalid token") {
                logout();
            }
            console.log(`Error in axios ${status}: ${message}`);
            return Promise.reject(new Error(message));
        } else {
            console.log("Something went wrong:", error.message);
            return Promise.reject(new Error(error.message));
        }
    }
);

export default axiosInstance;
