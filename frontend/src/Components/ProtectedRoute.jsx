import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

/**
 * ProtectedRoute component that restricts access based on user authentication and roles
 * @param {Array} allowedRoles - Array of roles allowed to access the route
 * @param {string} redirectPath - Path to redirect to if user is not authenticated or authorized
 * @returns {JSX.Element} - The child route(s) or a redirect
 */
const ProtectedRoute = ({
  allowedRoles,
  redirectPath = "/login",
  children,
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { openLoginModal } = useModal();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    openLoginModal();
    return <Navigate to={"/"} replace />;
  }

  // If allowedRoles is provided, check if user has one of the allowed roles
  if (allowedRoles && allowedRoles.length > 0) {
    // Make the role comparison case-insensitive
    const userRoleLowercase = user?.role?.toLowerCase();
    const hasRequiredRole = allowedRoles.some(
      (role) => role.toLowerCase() === userRoleLowercase,
    );

    if (!hasRequiredRole) {
      // If user doesn't have required role, redirect to unauthorized page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If user is authenticated and has the required role (if specified), render the children
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

