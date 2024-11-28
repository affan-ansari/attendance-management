import { KeyedMutator } from "swr";
import { IUserData } from "../../admin-dashboard-overview.types";

export interface AddEditModalProps {
    open: boolean;
    onClose: () => void;
    user?: IUserData | undefined;
    mutateUsers: KeyedMutator<IUserData[]>;
}

export interface IAddEditUserForm {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
}
