import { IUserData } from "../../../../components/admin-dashboard-overview/admin-dashboard-overview.types";

export interface IManageUserHeaderProps {
    selectedPosition: string;
    userData: IUserData[] | undefined;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSelectedPosition: React.Dispatch<React.SetStateAction<string>>;
}
