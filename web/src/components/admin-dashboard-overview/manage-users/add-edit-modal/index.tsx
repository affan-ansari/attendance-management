import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect } from "react";
import { getDefaultValues } from "./add-edit-modal.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, DialogActions } from "@mui/material";
import { AddEditModalProps, IAddEditUserForm } from "./add-edit-modal.types";
import { userAddEditSchema } from "../../../../validations/validation";

import CustomModal from "../../../ui/custom-modal";
import FormTextField from "../../../ui/form-text-field";
import * as userService from "../../admin-dashboard-overview.service";

import "./add-edit-modal.styles.scss";

const AddEditModal: React.FC<AddEditModalProps> = ({ open, onClose, user, mutateUsers }) => {
    const {
        handleSubmit,
        formState: { isSubmitting },
        control,
        reset,
    } = useForm({
        mode: "all",
        defaultValues: getDefaultValues(user),
        resolver: yupResolver(userAddEditSchema),
    });

    useEffect(() => {
        reset(getDefaultValues(user));
    }, [user, reset]);

    const onSubmit: SubmitHandler<IAddEditUserForm> = useCallback(
        async (formData: IAddEditUserForm) => {
            if (user) {
                const updatedUser = await userService.editUser(user.id, formData);
                if (updatedUser) mutateUsers();
                onClose();
            } else {
                const newUser = await userService.addUser(formData);
                if (newUser) mutateUsers();
                onClose();
            }
        },
        [user, mutateUsers, onClose]
    );

    return (
        <CustomModal open={open} onClose={onClose} title="Edit User">
            <Box
                className="edit-modal__formContainer"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box className="edit-modal__nameFields">
                    <FormTextField
                        name="firstName"
                        label="First Name"
                        control={control}
                        variant="standard"
                        fullWidth
                    />
                    <FormTextField
                        name="lastName"
                        label="Last Name"
                        control={control}
                        variant="standard"
                        fullWidth
                    />
                </Box>
                <FormTextField
                    name="designation"
                    label="Designation"
                    control={control}
                    variant="standard"
                />
                <FormTextField name="email" label="Email" control={control} variant="standard" />
                <DialogActions className="edit-modal__actions">
                    <Button
                        onClick={onClose}
                        variant="text"
                        color="error"
                        className="edit-modal__actionBtn"
                    >
                        Discard Changes
                    </Button>
                    <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        loadingPosition="center"
                        variant="text"
                        className="edit-modal__actionBtn"
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Box>
        </CustomModal>
    );
};

export default AddEditModal;
