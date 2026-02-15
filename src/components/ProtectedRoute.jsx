import { Navigate } from "react-router-dom";
import { useAuth } from "../App";
import { hasRole } from "../utils/auth";

/**
 * Protected Route Component
 * Checks if user is authenticated and has the required role
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if route requires specific roles
  if (allowedRoles.length > 0 && user?.role) {
    if (!hasRole(user.role, allowedRoles)) {
      // User doesn't have required role - redirect to dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
