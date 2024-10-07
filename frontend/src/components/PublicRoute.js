import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// PublicRoute will only allow unauthenticated users to access
const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is authenticated, redirect to home page, otherwise allow access
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
