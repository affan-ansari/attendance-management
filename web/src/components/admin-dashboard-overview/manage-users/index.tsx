import useSWR from "swr";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Fab, Typography } from "@mui/material";
import { IUserData } from "../admin-dashboard-overview.types";
import { getUsers } from "../admin-dashboard-overview.service";
import { Column } from "../../../components/ui/custom-table/custom-table.types";
import { BreadcrumbOption } from "../../../components/ui/bread-crumbs/bread-crumbs.types";

import AddEditModal from "./add-edit-modal";
import DeleteModal from "./delete-modal";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ManageUsersHeader from "./manage-users-header";
import CustomTable from "../../../components/ui/custom-table";
import CustomBreadcrumbs from "../../../components/ui/bread-crumbs";
import NameCell from "../../../components/ui/custom-table/cell-renderer/name-cell";
import UserActionsCell from "../../ui/custom-table/cell-renderer/user-actions-cell";

import "./manage-users.styles.scss";

const ManageUsers = () => {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUserData | undefined>();

    const { data: usersData, isLoading, isValidating, mutate } = useSWR("users", getUsers);
    const loading = isLoading || isValidating;

    const handleView = (user: IUserData) => {
        navigate(`/users/${user.id}`);
    };
    const handleEdit = (user: IUserData) => {
        setSelectedUser(user);
        setOpenAddEditModal(true);
    };
    const handleDelete = (user: IUserData) => {
        setSelectedUser(user);
        setOpenDeleteModal(true);
    };

    const columns: Column<IUserData>[] = [
        {
            label: "Name",
            render: NameCell,
        },
        {
            label: "Position",
            accessor: "designation",
        },
        {
            label: "Email",
            accessor: "email",
        },
        {
            label: "Total Hours",
            render: (_, row) => "126",
        },
        {
            label: "Daily Avg Hours",
            render: (_, row) => "126",
            width: 150,
        },
        {
            label: "",
            align: "center",
            render: UserActionsCell,
            renderProps: { onView: handleView, onEdit: handleEdit, onDelete: handleDelete },
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
    ];
    return (
        <Box>
            <Box sx={{ marginBottom: "1rem" }}>
                <CustomBreadcrumbs options={breadcrumbOptions} />
            </Box>
            <Typography className="manage-users__title" variant="h5">
                Users
            </Typography>
            <Box sx={{ paddingLeft: "1.5rem" }}>
                <ManageUsersHeader />
                <CustomTable columns={columns} data={usersData ?? []} loading={loading} />
            </Box>

            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                user={selectedUser}
                mutateUsers={mutate}
            />
            <AddEditModal
                open={openAddEditModal}
                onClose={() => {
                    setOpenAddEditModal(false);
                    setSelectedUser(undefined);
                }}
                user={selectedUser}
                mutateUsers={mutate}
            />
            <Fab
                onClick={() => setOpenAddEditModal(true)}
                className="manage-users__addBtn"
                color="primary"
                variant="extended"
            >
                Add User
                <Add className="manage-users__addIcon" />
            </Fab>
        </Box>
    );
};

export default ManageUsers;
