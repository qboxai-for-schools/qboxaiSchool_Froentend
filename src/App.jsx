"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(null);

  const login = (role) => setUser(role);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/dashboard/*"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
