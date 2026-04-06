import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { KEYS } from "../config/constant";

const ProtectedRoute = () => {
  // 1. Check Redux state first
  const { userInfo } = useSelector((state) => state.user);

  // 2. Fallback: Check localStorage directly if Redux hasn't hydrated yet
  const storedUser = JSON.parse(localStorage.getItem(KEYS.USER_INFO));

  // 3. Determine if the Sales Admin is authenticated
  const isAuthenticated = userInfo?.accessToken || storedUser?.token;

  // If no token is found in either place, send to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access to the child components (Dashboard, etc.)
  return <Outlet />;
};

export default ProtectedRoute;
