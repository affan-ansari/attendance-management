import { Controller, Control, Path } from "react-hook-form";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type FormTextFieldProps<T extends Record<string, any>> = {
    name: Path<T>;
    control: Control<any>;
    type?: string;
} & TextFieldProps;

const FormTextField = <T extends Record<string, any>>({
    name,
    control,
    type = "text",
    ...restProps
}: FormTextFieldProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev: boolean) => !prev);
    };
    const slotProps =
        type === "password"
            ? {
                  input: {
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton onClick={handleTogglePasswordVisibility}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      ),
                  },
              }
            : {};
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    error={!!error}
                    helperText={error ? error.message : ""}
                    type={showPassword ? "text" : type}
                    slotProps={slotProps}
                    {...field}
                    {...restProps}
                />
            )}
        />
    );
};

export default FormTextField;
