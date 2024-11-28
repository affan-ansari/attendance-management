import { Chip } from "@mui/material";
import { AttendanceStatusCellProps } from "./attendance-status-cell.types";
import { capitalizedStatus, statusColorMapping } from "./attendance-status-cell.utils";

const AttendanceStatusCell = ({ row }: AttendanceStatusCellProps) => {
    return (
        <Chip
            label={capitalizedStatus(row.status)}
            color={statusColorMapping[row.status] || "default"}
        />
    );
};

export default AttendanceStatusCell;
