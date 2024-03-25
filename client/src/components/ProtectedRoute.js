// ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/authProvider";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role === "ADMIN";
  const hasVoted = auth?.hasVoted;

  // Admin users should only access adminOnly routes and get redirected otherwise
  if (isAdmin && !adminOnly) {
    return <Navigate to="/404" />;
  }

  // Non-admin users who haven't voted should be directed to /select
  if (!isAdmin && !hasVoted) {
    return children;
  }

  // Allowing access if the user is an admin and it's an adminOnly route, or if the user has voted
  if ((isAdmin && adminOnly) || hasVoted) {
    return children;
  }

  // Redirect all other cases to /404
  return <Navigate to="/404" />;
};
export default ProtectedRoute;
