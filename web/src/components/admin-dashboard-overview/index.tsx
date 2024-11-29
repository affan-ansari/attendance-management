import useSWR from "swr";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { IUserData } from "./admin-dashboard-overview.types";
import { getUsers } from "./admin-dashboard-overview.service";
import { Column } from "../../components/ui/custom-table/custom-table.types";
import { BreadcrumbOption } from "../../components/ui/bread-crumbs/bread-crumbs.types";

import HomeIcon from "@mui/icons-material/Home";
import AvailabilityTables from "./availability-tables";
import CustomTable from "../../components/ui/custom-table";
import CustomBreadcrumbs from "../../components/ui/bread-crumbs";
import NameCell from "../../components/ui/custom-table/cell-renderer/name-cell";

import "./admin-dashboard-overview.styles.scss";
import OverallStatsHeader from "./overall-stats-header";

const AdminDashboardOverview = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: usersData,
        isLoading,
        isValidating,
    } = useSWR(`users?search=${searchQuery}`, getUsers);
    const loading = isLoading || isValidating;

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
            render: NameCell,
        },
        {
            label: "Total Hours",
            accessor: "totalHoursWorked",
        },
        {
            label: "Daily Avg Hours",
            accessor: "dailyAverageHours",
        },
    ];

    return (
        <Box>
            <CustomBreadcrumbs options={breadcrumbOptions} />
            <AvailabilityTables />
            <Typography variant="h4" mb={6}>
                Overall Stats
            </Typography>
            <Box sx={{ paddingLeft: "1.5rem" }}>
                <OverallStatsHeader setSearchQuery={setSearchQuery} />
                <CustomTable columns={columns} data={usersData ?? []} loading={loading} />
            </Box>
        </Box>
    );
};

export default AdminDashboardOverview;
