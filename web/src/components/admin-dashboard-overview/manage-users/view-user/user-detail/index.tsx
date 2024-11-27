import { Box, Typography } from "@mui/material";

import AvatarIcon from "../../../../../components/ui/avatar-icon";

import "./user-detail.styles.scss";

const UserDetail = ({ fullname, designation }: { fullname: string; designation: string }) => {
    return (
        <Box className="user-detail__mainContainer">
            <AvatarIcon className="user-detail__avatarIcon" name="Affan Arif" />
            <Box className="user-detail__details">
                <Typography variant="body1">{fullname}</Typography>
                <Typography variant="body2" className="user-detail__designation">
                    {designation}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserDetail;
