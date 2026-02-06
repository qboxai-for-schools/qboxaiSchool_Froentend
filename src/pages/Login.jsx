"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { Shield, GraduationCap, Users, ChevronDown } from "lucide-react";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const roles = [
    { id: "admin", title: "Admin", icon: Shield, color: "text-blue-600" },
    { id: "teacher", title: "Teacher", icon: Users, color: "text-indigo-600" },
    {
      id: "student",
      title: "Student",
      icon: GraduationCap,
      color: "text-cyan-600",
    },
  ];

    const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !password || !selectedRole) {
    alert("Please fill all fields");
    return;
  }

  login(selectedRole);
  navigate("/dashboard");
};


  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue to AI ERP</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
               type="password"
               placeholder="Enter your password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
            </div>

            {/* Role Selector Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    selectedRole
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between`}
                >
                  {selectedRoleData ? (
                    <div className="flex items-center gap-3">
                      <selectedRoleData.icon
                        className={`w-5 h-5 ${selectedRoleData.color}`}
                      />
                      <span className="font-medium text-gray-900">
                        {selectedRoleData.title}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Choose your role</span>
                  )}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.id);
                            setIsOpen(false);
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                            selectedRole === role.id
                              ? "bg-blue-50 border-l-4 border-blue-500"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${role.color}`} />
                          <span className="font-medium text-gray-900">
                            {role.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!email || !password || !selectedRole}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                email && password && selectedRole
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Demo Mode - No authentication required
          </p>
        </div>
      </div>
    </div>
  );
}
