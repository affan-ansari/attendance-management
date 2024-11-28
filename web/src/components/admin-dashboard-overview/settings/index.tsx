import { Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { BreadcrumbOption } from "../../../components/ui/bread-crumbs/bread-crumbs.types";
import CustomBreadcrumbs from "../../../components/ui/bread-crumbs";

import "./settings.styles.scss";
import SettingsForm from "./settings-form";

const Settings = () => {
    const breadcrumbOptions: BreadcrumbOption[] = [
        {
            label: "Dashboard",
            path: "/admin",
            icon: <HomeIcon fontSize="small" />,
        },
        {
            label: "Users",
            path: "/settings",
            icon: <SettingsIcon fontSize="small" />,
        },
    ];
    return (
        <Box className="settings__mainBox">
            <Box className="settings__breadCrumbBox">
                <CustomBreadcrumbs options={breadcrumbOptions} />
            </Box>
            <Typography className="settings__title" variant="h4">
                Settings
            </Typography>
            <SettingsForm />
        </Box>
    );
};

export default Settings;
