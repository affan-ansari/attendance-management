import { SxProps } from "@mui/material";

export interface ButtonGroupOption {
    label: string;
    onClick?: () => void;
}

export interface ReusableButtonGroupProps {
    options: ButtonGroupOption[];
    defaultIndex?: number;
    onPrimaryClick?: () => void;
    disabledOptions?: number[];
    variant?: "text" | "outlined" | "contained";
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    sx?: SxProps;
}
