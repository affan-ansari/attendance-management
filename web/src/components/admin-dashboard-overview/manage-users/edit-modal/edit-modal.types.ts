import { IUserData } from "../../../../components/admin-dashboard-overview/admin-dashboard-overview.types";

export interface EditModalProps {
    open: boolean;
    onClose: () => void;
    user: IUserData | undefined;
}

export interface IEditUserForm {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
}
