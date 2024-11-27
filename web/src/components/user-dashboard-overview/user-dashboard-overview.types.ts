export interface IMyAttendanceResponse {
    status: string;
    data: IAttendanceData[];
}

export interface IAttendanceData {
    user: string;
    status: string;
    date: string;
    punchIn?: string;
    punchOut?: string;
    id: string;
}
