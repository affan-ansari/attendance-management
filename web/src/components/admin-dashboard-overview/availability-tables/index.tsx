import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AvailabilityTableCard from "./availability-table-card";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    fetchAttendanceByStatus,
    selectAbsentData,
    selectAbsentLoading,
    selectOnLeaveData,
    selectOnLeaveLoading,
    selectPresentData,
    selectPresentLoading,
} from "./availabilityTablesSlice";

const AvailabilityTables = () => {
    const dispatch = useAppDispatch();

    const absentData = useAppSelector(selectAbsentData);
    const leaveData = useAppSelector(selectOnLeaveData);
    const presentData = useAppSelector(selectPresentData);

    const presentLoading = useAppSelector(selectPresentLoading);
    const absentLoading = useAppSelector(selectAbsentLoading);
    const leaveLoading = useAppSelector(selectOnLeaveLoading);

    useEffect(() => {
        ["present", "absent", "leave"].map((status: string) => {
            dispatch(fetchAttendanceByStatus(status));
        });
    }, []);

    return (
        <Box>
            <Typography variant="h4" my={2}>
                Today's Availability
            </Typography>
            <Box
                display={"flex"}
                gap={5}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                mb={5}
            >
                <AvailabilityTableCard
                    title="Present"
                    attendanceData={presentData}
                    loading={presentLoading}
                />
                <AvailabilityTableCard
                    title="Absent"
                    attendanceData={absentData}
                    loading={absentLoading}
                />
                <AvailabilityTableCard
                    title="On Leave"
                    attendanceData={leaveData}
                    loading={leaveLoading}
                />
            </Box>
        </Box>
    );
};

export default AvailabilityTables;
