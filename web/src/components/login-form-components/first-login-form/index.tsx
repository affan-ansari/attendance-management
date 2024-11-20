import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { styles } from "../login-form-components.styles";
import { FirstLoginFormTypes } from "./first-login-form.types";
import { firstLoginFormSchema } from "../../../validations/validation";

import FormTextField from "../../ui/form-text-field/index";

const FirstLoginForm = () => {
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
        (data) => console.log("DATA: ", data),
        []
    );

    return (
        <Box sx={styles.mainContainer}>
            <Box sx={styles.boxContainer}>
                <Typography variant="h5" sx={styles.title}>
                    Change password
                </Typography>
                <Box sx={styles.formContainer} component="form" onSubmit={handleSubmit(onSubmit)}>
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
