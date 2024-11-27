import { Box } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";

import ViewUser from "../../components/admin-dashboard-overview/manage-users/view-user";

import "./view-user.styles.scss";

const ViewUserPage = () => {
    const { id: userId } = useParams();
    if (userId)
        return (
            <Box className="view-user__mainContainer">
                <ViewUser userId={userId} />
            </Box>
        );
    return <Navigate to="/users" />;
};

export default ViewUserPage;
