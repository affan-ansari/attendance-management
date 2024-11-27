import { FilterList } from "@mui/icons-material";
import {
    Box,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from "@mui/material";

import "./attendance-header.styles.scss";

const AttendanceHeader = () => {
    return (
        <Box className="attendance-header__container">
            <Typography className="attendance-header__title" variant="h5">
                Past Attendance
            </Typography>
            <Box className="attendance-header__filtersContainer">
                <TextField label="Search" />
                <FormControl className="attendance-header__select">
                    <InputLabel id="status-select-id">Attribute</InputLabel>
                    <Select
                        labelId="status-select-id"
                        value={""}
                        label="Attribute"
                        onChange={() => {}}
                    >
                        <MenuItem value={"present"}>Present</MenuItem>
                        <MenuItem value={"absent"}>Absent</MenuItem>
                        <MenuItem value={"leave"}>Leave</MenuItem>
                    </Select>
                </FormControl>
                <IconButton className="attendance-header__filterBtn">
                    <FilterList />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AttendanceHeader;
