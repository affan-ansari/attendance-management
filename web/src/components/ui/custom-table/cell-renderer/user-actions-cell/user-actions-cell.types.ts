import { IUserData } from "../../../../../components/admin-dashboard-overview/admin-dashboard-overview.types";

export interface UserActionsCellProps {
    row: IUserData;
    onView?: (user: IUserData) => void;
    onEdit?: (user: IUserData) => void;
    onDelete?: (user: IUserData) => void;
}
