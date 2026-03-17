import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Lobby } from "../module/lobby/Lobby";
import { MainView } from "../module/main-view/MainView";
import { Login } from "../module/auth/Login";
import { Signup } from "../module/auth/Signup";
import { Landing } from "../module/landing/Landing";
import { SessionsPage } from "../module/pages/SessionsPage";
import { SettingsPage } from "../module/pages/SettingsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Lobby />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/meet/:id" element={<MainView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
