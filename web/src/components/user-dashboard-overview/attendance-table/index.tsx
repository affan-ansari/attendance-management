import { LoadingButton } from "@mui/lab";
import { Box, Chip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchMyAttendance, selectAttendanceLoading, selectMyAttendance } from "./attendanceSlice";
import {
    capitalizedStatus,
    isLastPunchInToday,
    statusColorMapping,
} from "../user-dashboard-overview.utils";

import CustomPagination from "./custom-pagination";
import * as attendanceService from "../user-dashboard-overview.service";

import "./attendance-table.styles.scss";

const paginationModel = { page: 0, pageSize: 5 };
const columns: GridColDef[] = [
    {
        field: "date",
        headerName: "Date",
        flex: 1,
        valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
            const status = params.value as string;
            const chipColor = statusColorMapping[status] || "default";
            return <Chip label={capitalizedStatus(status)} color={chipColor} />;
        },
    },
];

const AttendanceTable = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAttendanceLoading);
    const attendanceData = useAppSelector(selectMyAttendance);
    const [applyLeaveLoading, setApplyLeaveLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchMyAttendance());
    }, [dispatch]);

    const applyForLeave = async () => {
        try {
            setApplyLeaveLoading(true);
            await attendanceService.applyForLeave();
            dispatch(fetchMyAttendance());
        } finally {
            setApplyLeaveLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ height: 420, width: "100%" }}>
                <DataGrid
                    rowHeight={60}
                    disableAutosize
                    columns={columns}
                    loading={loading}
                    rows={attendanceData}
                    disableColumnMenu
                    disableColumnResize
                    disableColumnSorting
                    disableColumnSelector
                    disableRowSelectionOnClick
                    pageSizeOptions={[5]}
                    initialState={{ pagination: { paginationModel } }}
                    slots={{
                        pagination: CustomPagination,
                    }}
                    className="attendance-table__grid"
                    classes={{
                        withBorderColor: "customFooterContainer",
                    }}
                />
            </Box>

            <LoadingButton
                type="submit"
                variant="contained"
                loading={applyLeaveLoading}
                loadingPosition="end"
                endIcon={<Add />}
                disabled={applyLeaveLoading || isLastPunchInToday(attendanceData[0]?.date)}
                onClick={applyForLeave}
                className="attendance-table__leaveBtn"
            >
                APPLY FOR LEAVE
            </LoadingButton>
        </Box>
    );
};

export default AttendanceTable;
