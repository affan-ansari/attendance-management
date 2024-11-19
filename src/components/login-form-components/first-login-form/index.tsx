import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import "../styles.scss";
import FormTextField from "../../ui/form-text-field/index";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FirstLoginFormInputs {
    pin: string;
}

const schema = Yup.object().shape({
    pin: Yup.string().min(4, "PIN must be atlease 4 characters").required("PIN is required"),
});

const FirstLoginForm = () => {
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
        defaultValues: { pin: "" },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FirstLoginFormInputs> = (data) => console.log("DATA: ", data);

    return (
        <Box sx={{ width: "400px" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                Change password
            </Typography>
            <form
                className="login__form-container"
                action="submit"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormTextField<FirstLoginFormInputs>
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
                    CONFIRM
                </Button>
            </form>
        </Box>
    );
};

export default FirstLoginForm;
