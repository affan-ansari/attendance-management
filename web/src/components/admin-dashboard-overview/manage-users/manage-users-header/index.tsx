import { useEffect, useState } from "react";
import { FilterList } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { IManageUserHeaderProps } from "./manage-users-header.types";
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from "@mui/material";

import "./manage-users-header.styles.scss";

const ManageUsersHeader: React.FC<IManageUserHeaderProps> = ({
    userData,
    setSearchQuery,
    selectedPosition,
    setSelectedPosition,
}) => {
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const uniqueDesignations = Array.from(new Set(userData?.map((user) => user.designation))) || [];

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(debouncedSearchQuery);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [debouncedSearchQuery]);

    return (
        <Box className="users-header__container">
            <Box className="users-header__filtersContainer">
                <TextField
                    label="Search"
                    value={debouncedSearchQuery}
                    onChange={(e) => setDebouncedSearchQuery(e.target.value)}
                />
                <FormControl className="users-header__select">
                    <InputLabel id="position-select-id">Position</InputLabel>
                    <Select
                        defaultValue=""
                        label="Attribute"
                        value={selectedPosition}
                        labelId="position-select-id"
                        onChange={(e) => setSelectedPosition(e.target.value)}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 250,
                                    overflowY: "auto",
                                },
                            },
                        }}
                    >
                        <MenuItem value={""}>
                            <Box className="users-header__clearMenuBox">
                                <span>Clear</span>
                                <ClearIcon />
                            </Box>
                        </MenuItem>
                        {uniqueDesignations.map((designation, index) => (
                            <MenuItem key={index} value={designation}>
                                {designation}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <IconButton className="users-header__filterBtn">
                    <FilterList />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ManageUsersHeader;
