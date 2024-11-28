import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getSettingsDefaultValues } from "./settings-form.utils";
import { settingsFormSchema } from "../../../../validations/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISettingsForm } from "./settings-form.types";
import { Box, Fab, Typography } from "@mui/material";
import FormTextField from "../../../../components/ui/form-text-field";

import "./settings-form.styles.scss";
import { Check } from "@mui/icons-material";

const SettingsForm = () => {
    const {
        handleSubmit,
        formState: { isSubmitting },
        control,
        reset,
    } = useForm({
        mode: "all",
        defaultValues: getSettingsDefaultValues(),
        resolver: yupResolver(settingsFormSchema),
    });

    const onSubmit: SubmitHandler<ISettingsForm> = useCallback(async (formData: ISettingsForm) => {
        console.log(formData);
    }, []);

    return (
        <Box className="settings-form__formBox">
            <Typography variant="h5" gutterBottom>
                Office Hours
            </Typography>
            <FormTextField
                name="startTime"
                label="Start Time"
                control={control}
                variant="standard"
                className="settings-form__formField"
            />
            <FormTextField
                name="finishTime"
                label="Finish Time"
                control={control}
                variant="standard"
                className="settings-form__formField"
            />
            <FormTextField
                name="workingHours"
                label="Working Hours"
                control={control}
                variant="standard"
                type="number"
                className="settings-form__formField"
            />
            <Fab
                onClick={() => {}}
                className="settings-form__saveBtn"
                color="primary"
                variant="extended"
            >
                Save Changes
                <Check className="settings-form__saveIcon" />
            </Fab>
        </Box>
    );
};

export default SettingsForm;
