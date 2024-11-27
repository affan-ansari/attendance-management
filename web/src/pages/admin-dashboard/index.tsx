import { Box } from "@mui/material";

import AdminDashboardOverview from "../../components/admin-dashboard-overview";

import "./admin-dashboard.styles.scss";

const AdminDashboard = () => {
    return (
        <Box className="admin-dashboard__mainContainer">
            <AdminDashboardOverview />
        </Box>
    );
};

export default AdminDashboard;
