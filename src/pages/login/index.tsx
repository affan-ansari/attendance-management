import { Box } from "@mui/material";
import LoginForm from "../../components/login-form-components/login-form/index";
import { CONTAINER_HEIGHT } from "../../components/helperUtils";

const Login = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: CONTAINER_HEIGHT,
            }}
        >
            <LoginForm />
        </Box>
    );
};

export default Login;
