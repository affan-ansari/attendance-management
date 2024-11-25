export const statusColorMapping: {
    [key: string]: "default" | "primary" | "secondary" | "error" | "warning" | "info" | "success";
} = {
    present: "default",
    absent: "warning",
    leave: "primary",
};

export const capitalizedStatus = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

export const isLastPunchInToday = (attendanceDate: string) => {
    const today = new Date();
    const recordDate = new Date(attendanceDate);
    if (areDatesEqual(recordDate, today)) return true;
    return false;
};

const areDatesEqual = (date1: Date, date2: Date) => {
    if (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    ) {
        return true;
    }
    return false;
};
