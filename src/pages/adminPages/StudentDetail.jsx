import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Activity,
  TrendingUp,
  CheckCircle,
  XCircle,
  Loader2,
  UserCheck,
  GraduationCap,
} from "lucide-react";
import api from "../../services/api";

// Helper function to calculate age
const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Mock data for performance and attendance
const performanceData = {
  overall: 85,
  subjects: [
    { name: "Mathematics", score: 92, grade: "A+" },
    { name: "Science", score: 88, grade: "A" },
    { name: "English", score: 85, grade: "A" },
    { name: "History", score: 78, grade: "B+" },
    { name: "Geography", score: 82, grade: "A-" },
  ],
};

const attendanceData = {
  percentage: 94,
  present: 160,
  absent: 10,
  total: 170,
};

export default function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/user_details/${studentId}`);
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student details:", err);
        setError("Failed to load student details");
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600 text-lg">
          Loading student details...
        </span>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-8">
        <div className="glass-card rounded-2xl p-8 text-center backdrop-blur-xl bg-white/40 border border-white/30">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Student
          </h2>
          <p className="text-gray-600 mb-6">{error || "Student not found"}</p>
          <button
            onClick={() => navigate("/admin/students")}
            className="px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-medium hover:scale-105 transition-all"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/students")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Students</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
      </div>

      {/* Main Profile Card */}
      <div className="glass-card rounded-2xl p-8 mb-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl mb-4">
              {student.full_name.charAt(0).toUpperCase()}
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                student.is_active
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
                  : "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-700 border border-red-500/30"
              }`}
            >
              {student.is_active ? "Active" : "Inactive"}
            </div>
          </div>

          {/* Student Information */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {student.full_name}
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Admission No:{" "}
                  {student.student_profile?.admission_number || "N/A"}
                </p>
                {student.student_profile?.roll_number && (
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <BookOpen className="w-4 h-4" />
                    Roll No: {student.student_profile.roll_number}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-blue-500/30">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-red-500/30">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact and Personal Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {student.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {student.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Gender</p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {student.student_profile?.gender || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Date of Birth
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {student.student_profile?.date_of_birth
                        ? new Date(
                            student.student_profile.date_of_birth,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Age:{" "}
                      {calculateAge(student.student_profile?.date_of_birth)}{" "}
                      years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <Clock className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Joined</p>
                    <p className="text-sm text-gray-800 font-semibold">
                      {student.created_date}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {student.created_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                  <div className="p-2 rounded-lg bg-pink-100">
                    <UserCheck className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Role</p>
                    <p className="text-sm text-gray-800 font-semibold capitalize">
                      {student.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance and Attendance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Card */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>

          <div className="text-center mb-6">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#attendanceGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 70 * (1 - attendanceData.percentage / 100)
                  }`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="attendanceGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute">
                <p className="text-4xl font-bold text-gray-800">
                  {attendanceData.percentage}%
                </p>
                <p className="text-sm text-gray-500">Attendance</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/50">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {attendanceData.present}
              </p>
              <p className="text-xs text-gray-500">Present</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/50">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {attendanceData.absent}
              </p>
              <p className="text-xs text-gray-500">Absent</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/50">
              <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {attendanceData.total}
              </p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Performance</h2>
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>

          <div className="text-center mb-6 p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <p className="text-sm text-gray-600 mb-1">Overall Average</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {performanceData.overall}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Excellent Performance</p>
          </div>

          <div className="space-y-3">
            {performanceData.subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">
                    {subject.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-800">
                    {subject.score}%
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 text-xs font-semibold border border-blue-500/30">
                    {subject.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
