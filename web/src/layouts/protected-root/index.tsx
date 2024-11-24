import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import PageWrapper from "../../components/ui/page-wrapper";

export default function ProtectedRootLayout() {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <Navbar />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
}
