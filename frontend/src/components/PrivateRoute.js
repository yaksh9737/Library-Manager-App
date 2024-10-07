import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// PrivateRoute will only allow authenticated users to access
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is authenticated, allow access, otherwise redirect to login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
