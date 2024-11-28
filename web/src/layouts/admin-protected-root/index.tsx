import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Outlet, Navigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import PageWrapper from "../../components/ui/page-wrapper";
import { setCurrentUser } from "../../components/login-form-components/login-form/authSlice";

export default function AdminProtectedRootLayout() {
    const useDispatch = useAppDispatch();

    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (!token || !userJson) {
        localStorage.clear();
        return <Navigate to="/login" />;
    }
    if (userJson && JSON.parse(userJson).role !== "admin") {
        return <Navigate to="/" />;
    }
    useEffect(() => {
        if (userJson) {
            useDispatch(setCurrentUser(JSON.parse(userJson)));
        }
    }, [userJson]);

    return (
        <>
            <Navbar />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
}