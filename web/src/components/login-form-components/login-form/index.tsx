import { LoadingButton } from "@mui/lab";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormTypes } from "./login-form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleLoginSubmit } from "./login-form.utils";
import { Alert, Box, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema } from "../../../validations/validation";

import FormTextField from "../../ui/form-text-field/index";
import "../login-form-components.styles.scss";

const LoginForm = () => {
    const navigate = useNavigate();
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
        control,
        resetField,
    } = useForm({
        mode: "all",
        defaultValues: { username: "", pin: "" },
        resolver: yupResolver(loginFormSchema),
    });

    const onSubmit: SubmitHandler<LoginFormTypes> = useCallback(
        async (formData: LoginFormTypes) => {
            const { isLoginSuccess, errorMessage, isFirstLogin } = await handleLoginSubmit(
                formData
            );
            console.log(isLoginSuccess, isFirstLogin);
            if (isLoginSuccess) {
                navigate(isFirstLogin ? "/" : "/first-login");
            } else {
                if (errorMessage === "Invalid Credentials") setIsInvalidCredentials(true);
                else console.log("ERROR IN COMPONENT: ", errorMessage);
            }
            resetField("pin");
        },
        [handleLoginSubmit, setIsInvalidCredentials]
    );

    return (
        <Box className="login-form__mainContainer">
            <Box className="login-form__boxContainer">
                <Typography variant="h5">Sign in</Typography>
                {isInvalidCredentials && <Alert severity="error">Invalid Credentials</Alert>}
                <Box
                    className="login-form__formContainer"
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormTextField
                        name="username"
                        label="Username"
                        control={control}
                        variant="standard"
                    />
                    <FormTextField
                        name="pin"
                        type="password"
                        label="Pin Code"
                        control={control}
                        variant="standard"
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        loadingPosition="start"
                        startIcon={<></>} // is required with loadingPosition
                        disabled={!isDirty || !isValid}
                    >
                        SIGN IN
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
