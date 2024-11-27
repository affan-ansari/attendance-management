import { IAttendanceData } from "../../../../../components/user-dashboard-overview/user-dashboard-overview.types";

export interface IUserAttendanceTableProps {
    loading: boolean;
    attendanceData: IAttendanceData[];
}
