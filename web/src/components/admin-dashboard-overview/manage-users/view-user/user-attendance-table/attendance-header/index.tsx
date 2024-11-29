import { useEffect, useState } from "react";
import { FilterList } from "@mui/icons-material";
import { IAttendanceHeaderProps } from "./attendance-header.types";
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

import ClearIcon from "@mui/icons-material/Clear";

import "./attendance-header.styles.scss";

const AttendanceHeader: React.FC<IAttendanceHeaderProps> = ({
    searchQuery,
    selectedStatus,
    setSearchQuery,
    setSelectedStatus,
}) => {
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(debouncedSearchQuery);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [debouncedSearchQuery]);

    return (
        <Box className="attendance-header__container">
            <Typography className="attendance-header__title" variant="h5">
                Past Attendance
            </Typography>
            <Box className="attendance-header__filtersContainer">
                <TextField
                    label="Search"
                    value={debouncedSearchQuery}
                    onChange={(e) => setDebouncedSearchQuery(e.target.value)}
                />
                <FormControl className="attendance-header__select">
                    <InputLabel id="status-select-id">Attribute</InputLabel>
                    <Select
                        labelId="status-select-id"
                        value={selectedStatus}
                        label="Attribute"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <MenuItem value={""}>
                            <Box className="users-header__clearMenuBox">
                                <span>Clear</span>
                                <ClearIcon />
                            </Box>
                        </MenuItem>
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
