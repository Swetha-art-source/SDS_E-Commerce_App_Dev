// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user, isGuest } = useAuth();

  if (!user && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
