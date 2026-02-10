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
    {
      id: "admin",
      title: "Admin",
      icon: Shield,
      color: "text-blue-600",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      id: "teacher",
      title: "Teacher",
      icon: Users,
      color: "text-indigo-600",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "student",
      title: "Student",
      icon: GraduationCap,
      color: "text-cyan-600",
      gradient: "from-cyan-500 to-blue-600",
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Animated Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Single Card with Glass Effect */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/50 rounded-3xl shadow-2xl p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4 transform hover:scale-110 transition-transform">
            <span className="text-white font-bold text-3xl">QB</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to Qboxai-School</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80 transition-all shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80 transition-all shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Role Selector Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm border transition-all flex items-center justify-between shadow-sm ${
                selectedRole
                  ? "border-blue-400 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 ring-2 ring-blue-400/30"
                  : "border-white/40 bg-white/60 hover:bg-white/80"
              }`}
            >
              {selectedRoleData ? (
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${selectedRoleData.gradient} shadow-md`}
                  >
                    <selectedRoleData.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">
                    {selectedRoleData.title}
                  </span>
                </div>
              ) : (
                <span className="text-gray-400">Choose your role</span>
              )}
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full mt-2 w-full backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl shadow-2xl overflow-hidden z-20">
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
                      className={`w-full px-4 py-3 flex items-center gap-3 transition-all ${
                        selectedRole === role.id
                          ? `bg-gradient-to-r ${role.gradient} text-white border-l-4 border-white/50 shadow-md`
                          : "hover:bg-white/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${selectedRole === role.id ? "bg-white/20" : `bg-gradient-to-br ${role.gradient}`} shadow-sm`}
                      >
                        <Icon className={`w-5 h-5 text-white`} />
                      </div>
                      <span
                        className={`font-medium ${selectedRole === role.id ? "text-white" : "text-gray-700"}`}
                      >
                        {role.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-800">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
