interface IAttendanceByStatusUser {
    id: string;
    firstName: string;
    lastName: string;
    designation: string;
}

export interface IAttendanceByStatusData {
    id: string;
    date: string;
    status: string;
    user: IAttendanceByStatusUser;
}

export interface IAvailabilityTableCardProps {
    attendanceData: IAttendanceByStatusData[];
    title: string;
    loading: boolean;
}

export interface IAttendanceByStatusResponse {
    status: string;
    data: IAttendanceByStatusData[];
}
