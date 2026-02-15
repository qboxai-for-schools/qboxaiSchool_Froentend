"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { loginUser } from "../services/authService";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [schoolCode, setSchoolCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!schoolCode || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(schoolCode, email, password);

      if (result.success) {
        login(result.userData);
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to Qboxai-School</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* School Code Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              School Code
            </label>
            <input
              type="text"
              placeholder="ABC-015"
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80 transition-all shadow-sm placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

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
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80 transition-all shadow-sm placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80 transition-all shadow-sm placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={loading}
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
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <span>
            <p>
              ABC-015 <br />
              hareeshgouthu@gmail.com <br />
              SchoolAdmin@1234 <br />
            </p>
          </span>
        </form>
      </div>
    </div>
  );
}
