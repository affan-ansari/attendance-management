import { IUserData } from "../../admin-dashboard-overview.types";

export const getDefaultValues = (user: IUserData | undefined) => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    designation: user?.designation || "",
    email: user?.email || "",
});
