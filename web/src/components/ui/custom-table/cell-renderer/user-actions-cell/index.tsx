import { ButtonGroupOption } from "../../../button-group/button-group.types";

import ReusableButtonGroup from "../../../button-group";
import { UserActionsCellProps } from "./user-actions-cell.types";

const UserActionsCell: React.FC<UserActionsCellProps> = ({
    row: user,
    onView,
    onEdit,
    onDelete,
}) => {
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

export default UserActionsCell;
