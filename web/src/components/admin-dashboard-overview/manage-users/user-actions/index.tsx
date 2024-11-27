import { ButtonGroupOption } from "../../../../components/ui/button-group/button-group.types";
import { IUserData } from "../../../../components/admin-dashboard-overview/admin-dashboard-overview.types";

import ReusableButtonGroup from "../../../../components/ui/button-group";

interface UserActionsProps {
    user: IUserData;
    onView?: (user: IUserData) => void;
    onEdit?: (user: IUserData) => void;
    onDelete?: (user: IUserData) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ user, onView, onEdit, onDelete }) => {
    const options: ButtonGroupOption[] = [
        {
            label: "View",
            onClick: () => onView && onView(user),
        },
        {
            label: "Edit",
            onClick: () => onEdit && onEdit(user),
        },
        {
            label: "Delete",
            onClick: () => onDelete && onDelete(user),
        },
    ];

    return (
        <ReusableButtonGroup
            options={options}
            defaultIndex={0}
            variant="outlined"
            color="primary"
            sx={{ marginBottom: 2 }}
        />
    );
};

export default UserActions;
