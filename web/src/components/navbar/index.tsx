import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../components/login-form-components/login-form/authSlice";

import Sidebar from "./sidebar";
import AppBar from "@mui/material/AppBar";
import AvatarButton from "./avatar-button";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function ButtonAppBar() {
    const currentUser = useAppSelector(selectCurrentUser);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                {currentUser && currentUser.role === "admin" && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Attendance
                </Typography>

                {currentUser && (
                    <AvatarButton fullname={`${currentUser.firstName} ${currentUser.lastName}`} />
                )}

                <Sidebar open={drawerOpen} onClose={handleDrawerClose} />
            </Toolbar>
        </AppBar>
    );
}
