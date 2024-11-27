import { LoadingButton } from "@mui/lab";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { DeleteModalProps } from "./delete-modal.types";
import { Button, DialogActions, Typography } from "@mui/material";
import { fetchUsers } from "../../../../components/admin-dashboard-overview/userSlice";

import CustomModal from "../../../../components/ui/custom-modal";
import * as userService from "../../admin-dashboard-overview.service";

import "./delete-modal.styles.scss";

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, user }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const handleDelete = useCallback(async () => {
        if (user) {
            setLoading(true);
            const deletedUser = await userService.deleteUser(user.id);
            if (deletedUser) {
                setLoading(false);
                onClose();
                dispatch(fetchUsers());
            }
        }
    }, [user]);
    return (
        <CustomModal open={open} onClose={onClose} title="Delete User">
            <Typography mb={5} variant="body1" gutterBottom>
                Are you sure you want to delete the user{" "}
                <span className="delete-modal__name">
                    {user?.firstName} {user?.lastName}
                </span>
                ? This action is irreversible.
            </Typography>
            <DialogActions className="delete-modal__actions">
                <Button onClick={onClose} variant="text" className="delete-modal__actionBtn">
                    Nevermind
                </Button>
                <LoadingButton
                    color="error"
                    variant="text"
                    onClick={handleDelete}
                    loading={loading}
                    className="delete-modal__actionBtn"
                >
                    Delete User
                </LoadingButton>
            </DialogActions>
        </CustomModal>
    );
};

export default DeleteModal;
