import useSWR from "swr";
import { Box, Typography } from "@mui/material";
import AvailabilityTableCard from "./availability-table-card";
import { getAttendanceByStatus } from "../admin-dashboard-overview.service";

const AvailabilityTables = () => {
    const {
        data: presentData,
        isLoading: isPresentLoading,
        isValidating: isPresentValidating,
    } = useSWR("present-attendence", () => getAttendanceByStatus("present"));
    const presentLoading = isPresentLoading || isPresentValidating;

    const {
        data: absentData,
        isLoading: isAbsentLoading,
        isValidating: isAbentValidating,
    } = useSWR("absent-attendence", () => getAttendanceByStatus("absent"));
    const absentLoading = isAbsentLoading || isAbentValidating;

    const {
        data: leaveData,
        isLoading: isLeaveLoading,
        isValidating: isLeaveValidating,
    } = useSWR("leave-attendence", () => getAttendanceByStatus("leave"));
    const leaveLoading = isLeaveLoading || isLeaveValidating;

    return (
        <Box>
            <Typography variant="h4" my={2}>
                Today's Availability
            </Typography>
            <Box
                mb={5}
                gap={5}
                display={"flex"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
            >
                <AvailabilityTableCard
                    title="Present"
                    loading={presentLoading}
                    attendanceData={presentData ?? []}
                />
                <AvailabilityTableCard
                    title="Absent"
                    loading={absentLoading}
                    attendanceData={absentData ?? []}
                />
                <AvailabilityTableCard
                    title="On Leave"
                    loading={leaveLoading}
                    attendanceData={leaveData ?? []}
                />
            </Box>
        </Box>
    );
};

export default AvailabilityTables;
