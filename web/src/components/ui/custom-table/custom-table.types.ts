export interface Column<T> {
    label: string;
    accessor?: keyof T;
    width?: string | number;
    align?: "left" | "center" | "right";
    render?: (value: { row: T; [key: string]: any }, row: T) => React.ReactNode;
    renderProps?: { [key: string]: any };
}

export interface CustomTableProps<T> {
    columns: Column<T>[];
    data: T[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
    loading: boolean;
    paginationVariant?: "primary" | "standard";
}

export interface TablePaginationControlsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
    color?: "primary" | "standard";
    shape?: "rounded" | "circular";
    showFirstLast?: boolean;
}
