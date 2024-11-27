import React, { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IViewUserProps } from "./view-user.types";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Column } from "../../../../components/ui/custom-table/custom-table.types";
import { BreadcrumbOption } from "../../../../components/ui/bread-crumbs/bread-crumbs.types";
import { fetchUser, selectUser } from "../../../../components/admin-dashboard-overview/userSlice";
import { IAttendanceData } from "../../../../components/user-dashboard-overview/user-dashboard-overview.types";
import {
    capitalizedStatus,
    statusColorMapping,
} from "./user-attendance-table/user-attendance-table.utils";

import UserDetail from "./user-detail";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import UserAttendanceTable from "./user-attendance-table";
import CustomBreadcrumbs from "../../../../components/ui/bread-crumbs";

const ViewUser: React.FC<IViewUserProps> = ({ userId: id }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (id) {
            dispatch(fetchUser(id));
        }
    }, [id, dispatch]);

    const handleBack = () => {
        navigate("/users");
    };

    const columns: Column<IAttendanceData>[] = [
        {
            label: "Date",
            render: (_, row) => new Date(row.date).toLocaleDateString(),
        },
        {
            label: "Status",
            render: (_, row) => (
                <Chip
                    label={capitalizedStatus(row.status)}
                    color={statusColorMapping[row.status] || "default"}
                />
            ),
        },
    ];

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
            <Box sx={{ marginBottom: "1rem" }}>
                <CustomBreadcrumbs options={breadcrumbOptions} />
            </Box>
            <UserDetail
                fullname={`${user?.user.firstName} ${user?.user.lastName}`}
                designation={`${user?.user.designation}`}
            />
            {user && <UserAttendanceTable attendanceData={user.attendance} loading={false} />}
        </Box>
    );
};

export default ViewUser;
