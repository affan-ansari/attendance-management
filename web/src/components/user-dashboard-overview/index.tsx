import useSWR from "swr";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { isLastPunchInToday } from "./user-dashboard-overview.utils";
import { applyForLeave, getMyAttendance } from "./user-dashboard-overview.service";

import PunchInAlert from "./punch-in-alert";
import UserAttendanceTable from "../../components/admin-dashboard-overview/manage-users/view-user/user-attendance-table";

import "./user-dashboard-overview.styles.scss";

const UserDashboardOverview = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showPunchInAlert, setShowPunchInAlert] = useState(true);
    const [applyLeaveLoading, setApplyLeaveLoading] = useState(false);

    const {
        data,
        isLoading,
        isValidating,
        mutate: mutateAttendance,
    } = useSWR(
        `attendance/my-attendance?search=${searchQuery}&attendanceStatus=${selectedStatus}`,
        getMyAttendance
    );
    const loading = isLoading || isValidating;

    useEffect(() => {
        if (data && data.length > 0) {
            const isPunchedIn = isLastPunchInToday(data[0].date);
            setShowPunchInAlert(!isPunchedIn);
        }
    }, [data]);

    const handleApplyLeave = async () => {
        setApplyLeaveLoading(true);
        await applyForLeave();
        setApplyLeaveLoading(false);
        mutateAttendance();
    };

    return (
        <Box className="user-dash__mainContainer">
            {showPunchInAlert && <PunchInAlert mutateAttendance={mutateAttendance} />}
            <UserAttendanceTable
                loading={loading}
                searchQuery={searchQuery}
                attendanceData={data ?? []}
                selectedStatus={selectedStatus}
                setSearchQuery={setSearchQuery}
                setSelectedStatus={setSelectedStatus}
            />
            <LoadingButton
                type="submit"
                endIcon={<Add />}
                variant="contained"
                loadingPosition="end"
                onClick={handleApplyLeave}
                loading={applyLeaveLoading}
                className="user-dash__leaveBtn"
                disabled={applyLeaveLoading || (data && isLastPunchInToday(data[0]?.date))}
            >
                APPLY FOR LEAVE
            </LoadingButton>
        </Box>
    );
};

export default UserDashboardOverview;
