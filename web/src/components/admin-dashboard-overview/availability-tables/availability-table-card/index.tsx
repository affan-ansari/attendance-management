import { Box, Card, Typography } from "@mui/material";
import { getFullName } from "./availability-table-card.utils";
import { Column } from "../../../../components/ui/custom-table/custom-table.types";
import {
    IAttendanceByStatusData,
    IAvailabilityTableCardProps,
} from "./availability-table-card.types";

import AvatarIcon from "../../../../components/ui/avatar-icon";
import CustomTable from "../../../../components/ui/custom-table";

import "./availability-table-card.style.scss";

const AvailabilityTableCard: React.FC<IAvailabilityTableCardProps> = ({
    attendanceData,
    loading,
    title,
}) => {
    const attendanceColumns: Column<IAttendanceByStatusData>[] = [
        {
            label: "",
            render: (_, row) => (
                <Box className="availability-table-card__mainContainer">
                    <AvatarIcon name={getFullName(row.user.firstName, row.user.lastName)} />
                    <Box className="availability-table-card__details">
                        <Typography variant="body1">
                            {getFullName(row.user.firstName, row.user.lastName)}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="availability-table-card__designation"
                        >
                            {row.user.designation}
                        </Typography>
                    </Box>
                </Box>
            ),
        },
    ];

    return (
        <Card sx={{ padding: "1rem", width: 400 }}>
            <Typography variant="h5" pb={"1.5rem"}>
                {title}
            </Typography>
            <CustomTable
                columns={attendanceColumns}
                data={attendanceData}
                loading={loading}
                paginationVariant="standard"
            />
        </Card>
    );
};

export default AvailabilityTableCard;
