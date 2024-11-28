import { IUserData } from "../../admin-dashboard-overview.types";

export const getDefaultValues = (user: IUserData | undefined) => {
    if (user) {
        return {
            firstName: user?.firstName,
            lastName: user?.lastName,
            designation: user?.designation,
            email: user?.email,
        };
    }
    return {
        firstName: "",
        lastName: "",
        designation: "",
        email: "",
    };
};