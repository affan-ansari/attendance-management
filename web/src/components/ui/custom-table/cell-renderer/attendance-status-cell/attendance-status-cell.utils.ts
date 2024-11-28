export const capitalizedStatus = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

export const statusColorMapping: {
    [key: string]: "default" | "primary" | "secondary" | "error" | "warning" | "info" | "success";
} = {
    present: "default",
    absent: "warning",
    leave: "primary",
};
