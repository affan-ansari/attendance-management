import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    boxContainer: {
        width: "400px",
    },
    title: {
        marginBottom: "1rem",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
};
