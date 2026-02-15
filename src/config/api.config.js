// API Configuration
const API_CONFIG = {
  // Update this with your actual API base URL
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "https://qboxai.onrender.com/api",

  // Timeout in milliseconds
  TIMEOUT: 60000,

  // Authentication endpoints
  ENDPOINTS: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
};

export default API_CONFIG;
