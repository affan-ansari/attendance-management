import { useState } from "react";
import { getInitials } from "../navbar.utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { clearCurrentUser } from "../../login-form-components/login-form/authSlice";

import "./avatar-button.styles.scss";

const AvatarButton = ({ fullname }: { fullname: string }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(clearCurrentUser());
        navigate("/login");
    };
    return (
        <Box className="avatar-button__box">
            <IconButton onClick={handleAvatarClick} size="medium">
                <Avatar className="avatar-button__avatar">{getInitials(fullname)}</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default AvatarButton;
