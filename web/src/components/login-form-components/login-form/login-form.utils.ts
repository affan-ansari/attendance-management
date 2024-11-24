import { LoginFormTypes } from "./login-form.types";
import * as loginService from "./login-form.service";
// import { useNavigate } from "react-router-dom";

export const handleLoginSubmit = async (formData: LoginFormTypes) => {
    try {
        const userData = await loginService.login(formData);
        const { isFirstLogin } = userData;
        return {
            isLoginSuccess: true,
            isFirstLogin,
            errorMessage: "",
        };
    } catch (error: unknown) {
        const { message } = error as Error;
        return {
            isLoginSuccess: false,
            errorMessage: message,
        };
    }
};

// export const useLoginSubmit = () => {
//     const navigate = useNavigate();

//     const handleLoginSubmit = async (
//         formData: LoginFormTypes,
//         setIsInvalidCredentials: (value: React.SetStateAction<boolean>) => void
//     ) => {
//         console.log("INSIDE");
//         try {
//             setIsInvalidCredentials(false);
//             const userData = await loginService.login(formData);
//             const { isFirstLogin } = userData;

//             if (!isFirstLogin) navigate("/first-login");
//             else navigate("/");
//         } catch (error: unknown) {
//             if (error instanceof Error && error.message === "Invalid Credentials")
//                 setIsInvalidCredentials(true);
//             console.log("ERROR IN COMPONENT: ", error); // replace with toaster notifications
//         }
//     };

//     return { handleLoginSubmit };
// };
