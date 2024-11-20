import { Box } from "@mui/material";
import { NAVBAR_HEIGHT } from "../../helperUtils";
import { ReactNode } from "react";

type PageWrapperProps = {
    children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <Box
            sx={{
                height: "100vh",
                // paddingTop: `calc(${NAVBAR_HEIGHT})`,
            }}
        >
            {children}
        </Box>
    );
};

export default PageWrapper;
