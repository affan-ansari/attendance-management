import { Box } from "@mui/material";
import { IUserAttendanceTableProps } from "./user-attendance-table.types";
import { Column } from "../../../../../components/ui/custom-table/custom-table.types";
import { IAttendanceData } from "../../../../../components/user-dashboard-overview/user-dashboard-overview.types";

import AttendanceHeader from "./attendance-header";
import CustomTable from "../../../../../components/ui/custom-table";
import AttendanceStatusCell from "../../../../../components/ui/custom-table/cell-renderer/attendance-status-cell";

const UserAttendanceTable: React.FC<IUserAttendanceTableProps> = ({
    loading,
    searchQuery,
    attendanceData,
    selectedStatus,
    setSearchQuery,
    setSelectedStatus,
}) => {
    const columns: Column<IAttendanceData>[] = [
        {
            label: "Date",
            render: (value, _) => new Date(value.row.date).toLocaleDateString(),
        },
        {
            label: "Status",
            render: AttendanceStatusCell,
        },
    ];
    return (
        <Box>
            <AttendanceHeader
                searchQuery={searchQuery}
                selectedStatus={selectedStatus}
                setSearchQuery={setSearchQuery}
                setSelectedStatus={setSelectedStatus}
            />
            <Box pl={"1.5rem"}>
                <CustomTable columns={columns} data={attendanceData} loading={loading} />
            </Box>
        </Box>
    );
};

export default UserAttendanceTable;
