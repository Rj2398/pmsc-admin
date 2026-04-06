import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../Layout";
import ClientManagement from "../pages/ClientManagement";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../common/NotFound";
function AppRouter() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/client-management" element={<ClientManagement />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
