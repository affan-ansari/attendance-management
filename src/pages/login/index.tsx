import { Box } from "@mui/material";
import LoginForm from "../../components/login-form/index";

const Login = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 64px)",
            }}
        >
            <LoginForm />
        </Box>
    );
};

export default Login;
