import { IUserData } from "../../../../components/admin-dashboard-overview/admin-dashboard-overview.types";
import { KeyedMutator } from "swr";

export interface AddModalProps {
    open: boolean;
    onClose: () => void;
    mutateUsers: KeyedMutator<IUserData[]>;
}

export interface IAddUserForm {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
}
