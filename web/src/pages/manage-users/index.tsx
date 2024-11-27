import { Box } from "@mui/material";

import ManageUsers from "../../components/admin-dashboard-overview/manage-users";

import "./manage-users.styles.scss";

const ManageUsersPage = () => {
    return (
        <Box className="manage-users__mainContainer">
            <ManageUsers />;
        </Box>
    );
};

export default ManageUsersPage;
