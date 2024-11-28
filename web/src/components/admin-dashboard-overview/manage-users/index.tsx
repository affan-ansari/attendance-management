import useSWR from "swr";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Fab, Typography } from "@mui/material";
import { IUserData } from "../admin-dashboard-overview.types";
import { getUsers } from "../admin-dashboard-overview.service";
import { Column } from "../../../components/ui/custom-table/custom-table.types";
import { BreadcrumbOption } from "../../../components/ui/bread-crumbs/bread-crumbs.types";

import AddModal from "./add-modal";
import EditModal from "./edit-modal";
import DeleteModal from "./delete-modal";
import UserActions from "./user-actions";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ManageUsersHeader from "./manage-users-header";
import AvatarIcon from "../../../components/ui/avatar-icon";
import CustomTable from "../../../components/ui/custom-table";
import CustomBreadcrumbs from "../../../components/ui/bread-crumbs";

import "./manage-users.styles.scss";

const ManageUsers = () => {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUserData | undefined>();

    const { data: usersData, isLoading, isValidating, mutate } = useSWR("users", getUsers);
    const loading = isLoading || isValidating;

    const handleView = (user: IUserData) => {
        navigate(`/users/${user.id}`);
    };
    const handleEdit = (user: IUserData) => {
        setSelectedUser(user);
        setOpenEditModal(true);
    };
    const handleDelete = (user: IUserData) => {
        setSelectedUser(user);
        setOpenDeleteModal(true);
    };

    const columns: Column<IUserData>[] = [
        {
            label: "Name",
            render: (_, row) => (
                <Box className="manage-users__nameCol">
                    <AvatarIcon name={`${row.firstName} ${row.lastName}`} />
                    {`${row.firstName} ${row.lastName}`}
                </Box>
            ),
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
            render: (_, row) => (
                <UserActions
                    user={row}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
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
            <EditModal
                open={openEditModal}
                onClose={() => {
                    setOpenEditModal(false);
                    setSelectedUser(undefined);
                }}
                user={selectedUser}
                mutateUsers={mutate}
            />
            <AddModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                mutateUsers={mutate}
            />
            <Fab
                onClick={() => setOpenAddModal(true)}
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
