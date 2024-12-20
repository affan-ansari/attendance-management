import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FirstLoginFormTypes } from "./first-login-form.types";
import { firstLoginFormSchema } from "../../../validations/validation";

import FormTextField from "../../ui/form-text-field/index";
import * as firstLoginService from "./first-login-form.service";

import "../login-form-components.styles.scss";

const FirstLoginForm = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
    } = useForm({
        mode: "all",
        defaultValues: { pin: "" },
        resolver: yupResolver(firstLoginFormSchema),
    });

    const onSubmit: SubmitHandler<FirstLoginFormTypes> = useCallback(
        async (formData: FirstLoginFormTypes) => {
            const isFirstLoginSuccess = await firstLoginService.firstLogin(formData);
            if (isFirstLoginSuccess) {
                navigate("/");
            } else {
                localStorage.removeItem("token");
                navigate("/login");
                console.log("Something went wrong");
            }
        },
        []
    );

    return (
        <Box className="login-form__mainContainer">
            <Box className="login-form__boxContainer">
                <Typography variant="h5">Change password</Typography>
                <Box
                    className="login-form__formContainer"
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormTextField
                        name="pin"
                        type="password"
                        label="Pin Code"
                        control={control}
                        variant="standard"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={!isDirty || !isValid}
                    >
                        CONFIRM
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default FirstLoginForm;
