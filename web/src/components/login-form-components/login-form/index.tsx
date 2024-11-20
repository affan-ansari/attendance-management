import { useCallback } from "react";
import { LoginFormTypes } from "./login-form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { styles } from "../login-form-components.styles";
import { loginFormSchema } from "../../../validations/validation";

import FormTextField from "../../ui/form-text-field/index";

const LoginForm = () => {
    const {
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
    } = useForm({
        mode: "all",
        defaultValues: { username: "", pin: "" },
        resolver: yupResolver(loginFormSchema),
    });

    const onSubmit: SubmitHandler<LoginFormTypes> = useCallback(
        (data) => console.log("DATA: ", data),
        []
    );

    return (
        <Box sx={styles.mainContainer}>
            <Box sx={styles.boxContainer}>
                <Typography variant="h5" sx={styles.title}>
                    Sign in
                </Typography>
                <Box sx={styles.formContainer} component="form" onSubmit={handleSubmit(onSubmit)}>
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
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={!isDirty || !isValid}
                    >
                        SIGN IN
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
