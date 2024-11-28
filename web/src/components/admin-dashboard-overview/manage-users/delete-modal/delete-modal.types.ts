import { KeyedMutator } from "swr";
import { IUserData } from "../../../../components/admin-dashboard-overview/admin-dashboard-overview.types";

export interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    user: IUserData | undefined;
    mutateUsers: KeyedMutator<IUserData[] | undefined>;
}
