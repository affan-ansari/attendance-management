import React from "react";
import { Controller, Control, Path } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type FormTextFieldProps<T extends Record<string, any>> = {
    name: Path<T>;
    control: Control<T>;
} & TextFieldProps;

const FormTextField = <T extends Record<string, any>>({
    control,
    name,
    ...restProps
}: FormTextFieldProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    error={!!error}
                    helperText={error ? error.message : ""}
                    {...field}
                    {...restProps}
                />
            )}
        />
    );
};

export default FormTextField;
