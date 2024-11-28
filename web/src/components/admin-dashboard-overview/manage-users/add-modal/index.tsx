import { useCallback } from "react";
import { LoadingButton } from "@mui/lab";
import { getDefaultValues } from "./add-modal.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, DialogActions } from "@mui/material";
import { AddModalProps, IAddUserForm } from "./add-modal.types";
import { userAddEditSchema } from "../../../../validations/validation";

import CustomModal from "../../../ui/custom-modal";
import FormTextField from "../../../ui/form-text-field";
import * as userService from "../../admin-dashboard-overview.service";

import "./add-modal.styles.scss";

const AddModal: React.FC<AddModalProps> = ({ open, onClose, mutateUsers }) => {
    const {
        reset,
        control,
        handleSubmit,
        formState: { isSubmitting, isDirty, isValid },
    } = useForm({
        mode: "all",
        defaultValues: getDefaultValues(),
        resolver: yupResolver(userAddEditSchema),
    });

    const onSubmit: SubmitHandler<IAddUserForm> = useCallback(async (formData: IAddUserForm) => {
        const updatedUser = await userService.addUser(formData);
        if (updatedUser) mutateUsers();
        reset(getDefaultValues());
        onClose();
    }, []);

    return (
        <CustomModal open={open} onClose={onClose} title="Add User">
            <Box
                className="add-modal__formContainer"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box className="add-modal__nameFields">
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
                <DialogActions className="add-modal__actions">
                    <Button onClick={onClose} variant="text" className="add-modal__actionBtn">
                        Discard Changes
                    </Button>
                    <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        loadingPosition="center"
                        disabled={!isValid || !isDirty}
                        variant="text"
                        className="add-modal__actionBtn"
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Box>
        </CustomModal>
    );
};

export default AddModal;
