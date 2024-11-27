import React from "react";
import { Pagination, Box, PaginationItem } from "@mui/material";
import { TablePaginationControlsProps } from "../custom-table.types";

import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const TablePaginationControls: React.FC<TablePaginationControlsProps> = ({
    totalPages,
    currentPage,
    onPageChange,
    color = "primary",
    shape = "rounded",
    showFirstLast = true,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={onPageChange}
                color={color}
                showFirstButton={showFirstLast}
                showLastButton={showFirstLast}
                shape={shape}
                boundaryCount={1}
                siblingCount={0}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ first: SkipPreviousIcon, last: SkipNextIcon }}
                        {...item}
                    />
                )}
            />
        </Box>
    );
};

export default TablePaginationControls;
