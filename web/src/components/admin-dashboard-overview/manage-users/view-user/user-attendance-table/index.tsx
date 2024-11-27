import { Box, Chip } from "@mui/material";
import { IUserAttendanceTableProps } from "./user-attendance-table.types";
import { Column } from "../../../../../components/ui/custom-table/custom-table.types";
import { capitalizedStatus, statusColorMapping } from "./user-attendance-table.utils";
import { IAttendanceData } from "../../../../../components/user-dashboard-overview/user-dashboard-overview.types";

import AttendanceHeader from "./attendance-header";
import CustomTable from "../../../../../components/ui/custom-table";

const UserAttendanceTable: React.FC<IUserAttendanceTableProps> = ({ attendanceData, loading }) => {
    const columns: Column<IAttendanceData>[] = [
        {
            label: "Date",
            render: (_, row) => new Date(row.date).toLocaleDateString(),
        },
        {
            label: "Status",
            render: (_, row) => (
                <Chip
                    label={capitalizedStatus(row.status)}
                    color={statusColorMapping[row.status] || "default"}
                />
            ),
        },
    ];
    return (
        <Box>
            <AttendanceHeader />
            <Box pl={"1.5rem"}>
                <CustomTable columns={columns} data={attendanceData} loading={loading} />
            </Box>
        </Box>
    );
};

export default UserAttendanceTable;
