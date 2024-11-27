import Login from "../pages/login";
import RootLayout from "../layouts/root";
import FirstLogin from "../pages/first-login";
import ViewUserPage from "../pages/view-user";
import UserDashboard from "../pages/user-dashboard";
import ManageUsersPage from "../pages/manage-users";
import AdminDashboard from "../pages/admin-dashboard";
import ProtectedRootLayout from "../layouts/protected-root";
import AdminProtectedRootLayout from "../layouts/admin-protected-root";

import { Routes, Route } from "react-router-dom";

import "./App.scss";

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRootLayout />}>
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/first-login" element={<FirstLogin />} />
                </Route>

                <Route element={<AdminProtectedRootLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/users" element={<ManageUsersPage />} />
                    <Route path="/users/:id" element={<ViewUserPage />} />
                </Route>
            </Routes>
        </div>
    );
};
