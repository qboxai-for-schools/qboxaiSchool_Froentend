import api from "./api";
import { storeAuthData, clearAuthData } from "../utils/auth";

/**
 * Login with school code, email, and password
 */
export const loginUser = async (schoolCode, email, password) => {
  try {
    const response = await api.post("/auth/login", {
      school_code: schoolCode,
      email: email,
      password: password,
    });

    const { access_token, token_type } = response.data;

    // Store token and decode user data
    const userData = storeAuthData(access_token);

    return {
      success: true,
      userData,
      tokenType: token_type,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Login failed. Please check your credentials.",
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  clearAuthData();
  window.location.href = "/";
};

/**
 * Refresh token (if your API supports it)
 */
export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    const { access_token } = response.data;
    const userData = storeAuthData(access_token);
    return { success: true, userData };
  } catch (error) {
    console.error("Token refresh error:", error);
    return { success: false };
  }
};
