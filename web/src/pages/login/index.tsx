import { Navigate } from "react-router-dom";
import LoginForm from "../../components/login-form-components/login-form/index";

const Login = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/" />;
    }
    return <LoginForm />;
};

export default Login;
