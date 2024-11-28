import { Box } from "@mui/material";

import Settings from "../../components/admin-dashboard-overview/settings";

import "./settings.styles.scss";

const SettingsPage = () => {
    return (
        <Box className="settings-page__mainContainer">
            <Settings />;
        </Box>
    );
};

export default SettingsPage;
