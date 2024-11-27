import { FilterList } from "@mui/icons-material";
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

const ManageUsersHeader = () => {
    return (
        <Box className="users-header__container">
            <Box className="users-header__filtersContainer">
                <TextField label="Search" />
                <FormControl className="users-header__select">
                    <InputLabel id="position-select-id">Position</InputLabel>
                    <Select
                        labelId="position-select-id"
                        value={""}
                        label="Attribute"
                        onChange={() => {}}
                    >
                        <MenuItem value={"present"}>Frontend</MenuItem>
                        <MenuItem value={"absent"}>Backend</MenuItem>
                        <MenuItem value={"leave"}>Fullstack</MenuItem>
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
