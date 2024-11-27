import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IUserData } from "./admin-dashboard-overview.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { fetchUsers, selectUsers, selectUsersLoading } from "./userSlice";
import { Column } from "../../components/ui/custom-table/custom-table.types";
import { BreadcrumbOption } from "../../components/ui/bread-crumbs/bread-crumbs.types";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AvailabilityTables from "./availability-tables";
import AvatarIcon from "../../components/ui/avatar-icon";
import CustomTable from "../../components/ui/custom-table";
import CustomBreadcrumbs from "../../components/ui/bread-crumbs";

import "./admin-dashboard-overview.styles.scss";

const AdminDashboardOverview = () => {
    const dispatch = useAppDispatch();
    const usersData = useAppSelector(selectUsers);
    const loading = useAppSelector(selectUsersLoading);
    const breadcrumbOptions: BreadcrumbOption[] = [
        {
            label: "Dashboard",
            icon: <HomeIcon fontSize="small" />,
            path: "/admin",
        },
    ];

    const columns: Column<IUserData>[] = [
        {
            label: "Name",
            width: "30%",
            render: (_, row) => (
                <Box className="admin-dashboard-overview__nameCol">
                    <AvatarIcon name={`${row.firstName} ${row.lastName}`} />
                    {`${row.firstName} ${row.lastName}`}
                </Box>
            ),
        },
        {
            label: "Total Hours",
            render: (_, row) => "126",
        },
        {
            label: "Daily Avg Hours",
            render: (_, row) => "7.5",
        },
    ];

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <Box>
            <CustomBreadcrumbs options={breadcrumbOptions} />
            <AvailabilityTables />
            <Typography variant="h4" mb={6}>
                Overall Stats
            </Typography>
            <Box sx={{ paddingLeft: "1.5rem" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TextField label="Search" />
                    <Link to="/users">
                        <Button startIcon={<PeopleIcon />} variant="contained">
                            Manage Users
                        </Button>
                    </Link>
                </Box>
                <CustomTable columns={columns} data={usersData} loading={loading} />
            </Box>
        </Box>
    );
};

export default AdminDashboardOverview;
