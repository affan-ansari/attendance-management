import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { IOverallStatsHeaderProps } from "./overall-stats-header.types";

import PeopleIcon from "@mui/icons-material/People";
import { useEffect, useState } from "react";

const OverallStatsHeader: React.FC<IOverallStatsHeaderProps> = ({ setSearchQuery }) => {
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
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <TextField
                label="Search"
                value={debouncedSearchQuery}
                onChange={(e) => setDebouncedSearchQuery(e.target.value)}
            />
            <Link to="/users">
                <Button startIcon={<PeopleIcon />} variant="contained">
                    Manage Users
                </Button>
            </Link>
        </Box>
    );
};

export default OverallStatsHeader;
