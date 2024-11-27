import { Avatar } from "@mui/material";
import { getInitials } from "./avatar-icons.utils";
import { IAvatarIconProps } from "./avatar-icons.types";

const AvatarIcon = ({ name, avatarClassNames, ...rest }: IAvatarIconProps) => {
    return <Avatar {...rest}>{getInitials(name)}</Avatar>;
};

export default AvatarIcon;
