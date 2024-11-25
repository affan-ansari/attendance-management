import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectMyAttendance } from "./attendance-table/attendanceSlice";
import { isLastPunchInToday } from "./user-dashboard-overview.utils";

import PunchInAlert from "./punch-in-alert";
import AttendanceTable from "./attendance-table";
import AttendanceHeader from "./attendance-header";

import "./user-dashboard-overview.styles.scss";

const UserDashboardOverview = () => {
    const attendanceData = useAppSelector(selectMyAttendance);
    const [showPunchInAlert, setShowPunchInAlert] = useState(true);
    useEffect(() => {
        if (attendanceData.length > 0) {
            const isPunchedIn = isLastPunchInToday(attendanceData[0].date);
            setShowPunchInAlert(!isPunchedIn);
        }
    }, [attendanceData]);
    return (
        <Box className="user-dash__mainContainer">
            {showPunchInAlert && <PunchInAlert />}
            <AttendanceHeader />
            <AttendanceTable />
        </Box>
    );
};

export default UserDashboardOverview;
