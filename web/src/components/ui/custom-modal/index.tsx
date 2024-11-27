import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { ReusableDialogProps } from "./custom-modal.types";

const CustomModal: React.FC<ReusableDialogProps> = ({ open, onClose, title, children }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default CustomModal;
