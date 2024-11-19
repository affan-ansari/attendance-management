import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import "../styles.scss";
import FormTextField from "../../ui/form-text-field/index";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormInputs {
    username: string;
    pin: string;
}

const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    pin: Yup.string().min(4, "PIN must be atlease 4 characters").required("PIN is required"),
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev: boolean) => !prev);
    };

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
    } = useForm({
        mode: "all",
        defaultValues: { username: "", pin: "" },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log("DATA: ", data);

    return (
        <Box sx={{ width: "400px" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                Sign in
            </Typography>
            <form
                className="login__form-container"
                action="submit"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormTextField<LoginFormInputs>
                    name="username"
                    control={control}
                    label="Username"
                    variant="standard"
                />
                <FormTextField<LoginFormInputs>
                    name="pin"
                    control={control}
                    label="Pin Code"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button fullWidth variant="contained" type="submit" disabled={!isDirty || !isValid}>
                    SIGN IN
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;
