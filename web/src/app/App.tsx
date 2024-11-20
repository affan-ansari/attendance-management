import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import UserDashboard from "../pages/user-dashboard";
import About from "../pages/about";
import RootLayout from "../layouts/root";
import Counter from "../features/counter/counter";
import Posts from "../pages/posts";
import Login from "../pages/login";
import FirstLogin from "../pages/first-login";
import "./App.scss";

export const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/first-login" element={<FirstLogin />} />
                </Route>
            </Routes>
        </div>
    );
};
