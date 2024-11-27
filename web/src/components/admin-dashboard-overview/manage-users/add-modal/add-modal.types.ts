export interface AddModalProps {
    open: boolean;
    onClose: () => void;
}

export interface IAddUserForm {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
}
