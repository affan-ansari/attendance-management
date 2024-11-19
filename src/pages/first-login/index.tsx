import { Box } from "@mui/material";
import FirstLoginForm from "../../components/login-form-components/first-login-form";
import { CONTAINER_HEIGHT } from "../../components/helperUtils";

const FirstLogin = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: CONTAINER_HEIGHT,
            }}
        >
            <FirstLoginForm />
        </Box>
    );
};

export default FirstLogin;
