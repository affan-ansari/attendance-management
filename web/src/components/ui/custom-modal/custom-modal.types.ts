export interface ReusableDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
