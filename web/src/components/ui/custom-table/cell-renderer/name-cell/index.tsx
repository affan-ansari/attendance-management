import { Box } from "@mui/material";
import { NameCellProps } from "./name-cell.types";

import AvatarIcon from "../../../../../components/ui/avatar-icon";

import "./name-cell.styles.scss";

const NameCell = ({ row }: NameCellProps) => {
    return (
        <Box className="name-cell__nameCol">
            <AvatarIcon name={`${row.firstName} ${row.lastName}`} />
            {`${row.firstName} ${row.lastName}`}
        </Box>
    );
};

export default NameCell;
