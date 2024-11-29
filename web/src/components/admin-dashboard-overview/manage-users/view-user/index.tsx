import useSWR from "swr";
import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { BreadcrumbOption } from "../../../../components/ui/bread-crumbs/bread-crumbs.types";
import { getUser } from "../../../../components/admin-dashboard-overview/admin-dashboard-overview.service";

import UserDetail from "./user-detail";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import UserAttendanceTable from "./user-attendance-table";
import CustomBreadcrumbs from "../../../../components/ui/bread-crumbs";

import "./view-user.styles.scss";

const ViewUser = () => {
    // const { id: userId } = useParams();
    const userId = "6746f71953639bcfc45e1e92";
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const {
        data: user,
        isLoading,
        isValidating,
    } = useSWR(`users/${userId}?search=${searchQuery}&attendanceStatus=${selectedStatus}`, getUser);
    const loading = isLoading || isValidating;

    const breadcrumbOptions: BreadcrumbOption[] = [
        {
            label: "Dashboard",
            icon: <HomeIcon fontSize="small" />,
            path: "/admin",
        },
        {
            label: "Users",
            icon: <PeopleIcon fontSize="small" />,
            path: "/users",
        },
        {
            label: `${user?.user.firstName} ${user?.user.lastName}`,
            icon: <PersonIcon fontSize="small" />,
        },
    ];

    return (
        <Box>
            {loading ? (
                <Box className="view-user__spinner">
                    <CircularProgress size={70} />
                </Box>
            ) : (
                <>
                    <Box sx={{ marginBottom: "1rem" }}>
                        <CustomBreadcrumbs options={breadcrumbOptions} />
                    </Box>
                    <UserDetail
                        fullname={`${user?.user.firstName} ${user?.user.lastName}`}
                        designation={`${user?.user.designation}`}
                    />
                </>
            )}

            <UserAttendanceTable
                loading={loading}
                searchQuery={searchQuery}
                selectedStatus={selectedStatus}
                setSearchQuery={setSearchQuery}
                setSelectedStatus={setSelectedStatus}
                attendanceData={user?.attendance ?? []}
            />
        </Box>
    );
};

export default ViewUser;
