import { useNavigate } from "react-router-dom";
import { ISidebarProps } from "./sidebar.types";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";

export default function Sidebar({ open, onClose }: ISidebarProps) {
    const navigate = useNavigate();
    const menuItems = [
        {
            text: "Dashboard",
            icon: <HomeIcon />,
            path: "/admin",
        },
        {
            text: "Users",
            icon: <PeopleIcon />,
            path: "/users",
        },
        {
            text: "Settings",
            icon: <SettingsIcon />,
            path: "/settings",
        },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div role="presentation" onClick={onClose} onKeyDown={onClose} style={{ width: 250 }}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} onClick={() => handleNavigation(item.path)}>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </div>
        </Drawer>
    );
}
