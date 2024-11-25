import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Outlet, Navigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import PageWrapper from "../../components/ui/page-wrapper";
import { setCurrentUser } from "../../components/login-form-components/login-form/userSlice";

export default function ProtectedRootLayout() {
    const useDispatch = useAppDispatch();

    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            useDispatch(setCurrentUser(JSON.parse(userJson)));
        }
    });
    return (
        <>
            <Navbar />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
}
