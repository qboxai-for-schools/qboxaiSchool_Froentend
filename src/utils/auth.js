import { jwtDecode } from "jwt-decode";

/**
 * Decode JWT token and extract user information
 */
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.sub,
      role: decoded.role,
      schoolId: decoded.school_id,
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Store token and user data in localStorage
 */
export const storeAuthData = (accessToken) => {
  localStorage.setItem("access_token", accessToken);
  const userData = decodeToken(accessToken);
  if (userData) {
    localStorage.setItem("user_data", JSON.stringify(userData));
  }
  return userData;
};

/**
 * Get stored user data
 */
export const getStoredUserData = () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token || isTokenExpired(token)) {
      clearAuthData();
      return null;
    }

    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting stored user data:", error);
    return null;
  }
};

/**
 * Clear all auth data
 */
export const clearAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_data");
};

/**
 * Map role to user type
 */
export const mapRoleToUserType = (role) => {
  const roleMap = {
    school_admin: "admin",
    teacher: "teacher",
    student: "student",
  };
  return roleMap[role] || null;
};

/**
 * Check if user has required role
 */
export const hasRole = (userRole, allowedRoles) => {
  if (!Array.isArray(allowedRoles)) {
    allowedRoles = [allowedRoles];
  }
  const mappedRole = mapRoleToUserType(userRole);
  return allowedRoles.includes(mappedRole);
};
