import { LoginFormTypes } from "./login-form.types";
import * as loginService from "./login-form.service";

export const handleLoginSubmit = async (formData: LoginFormTypes) => {
    try {
        const userData = await loginService.login(formData);
        const { isFirstLogin, role } = userData;
        return {
            role,
            isFirstLogin,
            errorMessage: "",
            isLoginSuccess: true,
        };
    } catch (error: unknown) {
        const { message } = error as Error;
        return {
            isLoginSuccess: false,
            errorMessage: message,
        };
    }
};
