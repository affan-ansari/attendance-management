import { IAttendanceData } from "../../../../../components/user-dashboard-overview/user-dashboard-overview.types";

export interface IUserAttendanceTableProps {
    loading: boolean;
    searchQuery: string;
    selectedStatus: string;
    attendanceData: IAttendanceData[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
}
