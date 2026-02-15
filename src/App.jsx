"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { getStoredUserData, mapRoleToUserType } from "./utils/auth";
import { logoutUser } from "./services/authService";
import StudentDetail from "./pages/adminPages/StudentDetail";
import ClassDetails from "./pages/adminPages/adminClassDetails";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const userData = getStoredUserData();
    if (userData) {
      setUser({
        userId: userData.userId,
        role: userData.role,
        userType: mapRoleToUserType(userData.role),
        schoolId: userData.schoolId,
      });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser({
      userId: userData.userId,
      role: userData.role,
      userType: mapRoleToUserType(userData.role),
      schoolId: userData.schoolId,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    logoutUser();
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students/:studentId"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StudentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/classes/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ClassDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
