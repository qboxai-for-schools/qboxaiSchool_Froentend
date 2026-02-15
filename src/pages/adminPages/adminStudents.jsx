import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  TrendingUp,
  Users,
  Award,
  Plus,
  Upload,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  UserCheck,
  BookOpen,
  Search,
  Loader2,
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  Power,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import api from "../../services/api";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Student performance by subject
const subjectPerformanceData = [
  { subject: "Math", average: 82 },
  { subject: "Science", average: 78 },
  { subject: "English", average: 85 },
  { subject: "History", average: 80 },
  { subject: "Geography", average: 76 },
  { subject: "Physics", average: 74 },
];

// Grade distribution
const gradeDistributionData = [
  { name: "A+ (90-100)", value: 85, color: "#10b981" },
  { name: "A (80-89)", value: 120, color: "#3b82f6" },
  { name: "B (70-79)", value: 95, color: "#8b5cf6" },
  { name: "C (60-69)", value: 65, color: "#f59e0b" },
  { name: "D (50-59)", value: 20, color: "#ef4444" },
];

// Enrollment trends
const enrollmentTrendData = [
  { month: "Jan", students: 320 },
  { month: "Feb", students: 335 },
  { month: "Mar", students: 348 },
  { month: "Apr", students: 362 },
  { month: "May", students: 378 },
  { month: "Jun", students: 385 },
];

// Helper function to calculate age from DOB
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

// Helper function to calculate age distribution
const calculateAgeDistribution = (studentsData) => {
  const ageGroups = {
    "5-8 years": { count: 0, color: "#06b6d4" },
    "9-12 years": { count: 0, color: "#8b5cf6" },
    "13-15 years": { count: 0, color: "#f59e0b" },
    "16-18 years": { count: 0, color: "#ec4899" },
    "18+ years": { count: 0, color: "#10b981" },
  };

  studentsData.forEach((student) => {
    const age = calculateAge(student.student_profile?.date_of_birth);

    if (age !== "N/A") {
      const ageNum = parseInt(age);
      if (ageNum >= 5 && ageNum <= 8) {
        ageGroups["5-8 years"].count++;
      } else if (ageNum >= 9 && ageNum <= 12) {
        ageGroups["9-12 years"].count++;
      } else if (ageNum >= 13 && ageNum <= 15) {
        ageGroups["13-15 years"].count++;
      } else if (ageNum >= 16 && ageNum <= 18) {
        ageGroups["16-18 years"].count++;
      } else if (ageNum > 18) {
        ageGroups["18+ years"].count++;
      }
    }
  });

  // Filter out groups with 0 count and return
  const result = Object.entries(ageGroups)
    .filter(([_, data]) => data.count > 0)
    .map(([name, data]) => ({
      name,
      value: data.count,
      color: data.color,
    }));

  console.log("Age Distribution:", result); // Debug log
  return result;
};

// Helper function to get status color
const getStatusColor = (isActive) => {
  return isActive
    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
    : "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-700 border border-red-500/30";
};

export default function Students() {
  const [showAdmitForm, setShowAdmitForm] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
  });
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    age: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
  });
  const [toggleLoading, setToggleLoading] = useState({});

  const navigate = useNavigate();

  // Fetch students from API
  const fetchStudents = async (searchQuery = "") => {
    try {
      setLoading(true);
      const response = await api.get("/users/list-users", {
        params: {
          page: page,
          page_size: 20,
          role: "student",
          search: searchQuery,
        },
      });

      const data = response.data;
      setStudents(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.total_pages || 1);

      // Calculate stats
      const activeCount = data.items?.filter((s) => s.is_active).length || 0;
      const maleCount =
        data.items?.filter((s) => s.student_profile?.gender === "Male")
          .length || 0;
      const femaleCount =
        data.items?.filter((s) => s.student_profile?.gender === "Female")
          .length || 0;

      setStats({
        totalStudents: data.total || 0,
        activeStudents: activeCount,
        maleStudents: maleCount,
        femaleStudents: femaleCount,
      });

      // Calculate age distribution
      const ageData = calculateAgeDistribution(data.items || []);
      setAgeDistribution(ageData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // Fetch students on component mount and when page changes
  useEffect(() => {
    fetchStudents(searchTerm);
  }, [page]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm !== undefined) {
        setPage(1); // Reset to first page on search
        fetchStudents(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student:", formData);
    setShowAdmitForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      grade: "",
      age: "",
      address: "",
      guardianName: "",
      guardianPhone: "",
    });
  };

  const handleBulkUpload = () => {
    setShowBulkUploadModal(true);
    setUploadFile(null);
    setUploadError("");
    setUploadSuccess("");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (["csv", "xlsx", "xls"].includes(fileExtension)) {
        setUploadFile(file);
        setUploadError("");
      } else {
        setUploadError("Please upload only CSV or Excel (.xlsx, .xls) files");
        setUploadFile(null);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!uploadFile) {
      setUploadError("Please select a file to upload");
      return;
    }

    try {
      setUploadLoading(true);
      setUploadError("");
      setUploadSuccess("");

      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await api.post("/bulk/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess(
        response.data.message || "Students uploaded successfully!",
      );
      setUploadFile(null);

      // Refresh the students list after successful upload
      setTimeout(() => {
        fetchStudents(searchTerm);
        setShowBulkUploadModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to upload file. Please try again.",
      );
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle demo file download
  const handleDownloadDemo = () => {
    // You can either:
    // 1. Download from public/assets folder
    const link = document.createElement("a");
    link.href = "/assets/students_bulk_upload_demo.csv"; // Place your demo file in public/assets/
    link.download = "students_bulk_upload_demo.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // OR 2. Create dynamic CSV data
    // const csvContent = `Full Name,Email,Phone,Gender,Date of Birth,Admission Number,Roll Number,Address,Guardian Name,Guardian Phone,Guardian Email
    // John Doe,john.doe@school.com,1234567890,Male,2010-05-15,ADM001,ROLL001,123 Street,Jane Doe,9876543210,jane.doe@email.com
    // Mary Smith,mary.smith@school.com,1234567891,Female,2011-08-20,ADM002,ROLL002,456 Avenue,Robert Smith,9876543211,robert.smith@email.com`;
    // const blob = new Blob([csvContent], { type: "text/csv" });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "students_bulk_upload_demo.csv";
    // a.click();
    // window.URL.revokeObjectURL(url);
  };

  const handleViewDetails = (studentId) => {
    navigate(`/admin/students/${studentId}`);
  };

  const handleToggleStatus = async (studentId, currentStatus) => {
    try {
      setToggleLoading({ ...toggleLoading, [studentId]: true });

      const response = await api.patch(`/users/${studentId}`, {
        is_active: !currentStatus,
      });

      // Update the student in the local state
      setStudents(
        students.map((student) =>
          student.id === studentId
            ? { ...student, is_active: !currentStatus }
            : student,
        ),
      );

      // Update stats
      const activeCount = students.filter((s) =>
        s.id === studentId ? !currentStatus : s.is_active,
      ).length;
      setStats({ ...stats, activeStudents: activeCount });

      setToggleLoading({ ...toggleLoading, [studentId]: false });
    } catch (error) {
      console.error("Error toggling student status:", error);
      setToggleLoading({ ...toggleLoading, [studentId]: false });
      alert("Failed to update student status. Please try again.");
    }
  };

  return (
    <div className="p-8">
      {/* Header with Buttons */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Students Management
          </h1>
          <p className="text-gray-600">
            Track student enrollment, performance, and attendance
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadDemo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-purple-500/90 via-pink-500/90 to-rose-500/90 text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Download className="w-5 h-5" />
            Download Template
          </button>
          <button
            onClick={handleBulkUpload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500/90 via-teal-500/90 to-cyan-500/90 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Upload className="w-5 h-5" />
            Bulk Upload
          </button>
          <button
            onClick={() => setShowAdmitForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-500/90 via-indigo-500/90 to-purple-500/90 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Plus className="w-5 h-5" />
            Admit Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents.toString()}
          change={`+${stats.activeStudents}`}
          icon={GraduationCap}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Students"
          value={stats.activeStudents.toString()}
          change={`${Math.round((stats.activeStudents / stats.totalStudents) * 100) || 0}%`}
          icon={UserCheck}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Male Students"
          value={stats.maleStudents.toString()}
          change={`${Math.round((stats.maleStudents / stats.totalStudents) * 100) || 0}%`}
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Female Students"
          value={stats.femaleStudents.toString()}
          change={`${Math.round((stats.femaleStudents / stats.totalStudents) * 100) || 0}%`}
          icon={Award}
          trend="up"
          color="cyan"
        />
      </div>

      {/* Students List Table */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, admission no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 bg-white/50"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading students...</span>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No students found</p>
            {searchTerm && (
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search query
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Admission No.
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Gender
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Age
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      DOB
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      onClick={() => handleViewDetails(student.id)}
                      className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-indigo-500/10 hover:to-purple-500/10 transition-all duration-300 cursor-pointer"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-gray-600 font-semibold">
                          {student.student_profile?.admission_number || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
                            {student.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">
                              {student.full_name}
                            </span>
                            {student.student_profile?.roll_number && (
                              <div className="text-xs text-gray-500">
                                Roll: {student.student_profile.roll_number}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="text-xs truncate max-w-[180px]">
                            {student.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {student.phone || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 text-sm font-medium border border-purple-500/30">
                          {student.student_profile?.gender || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        {calculateAge(student.student_profile?.date_of_birth)}{" "}
                        yrs
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {student.student_profile?.date_of_birth
                          ? new Date(
                              student.student_profile.date_of_birth,
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            student.is_active,
                          )}`}
                        >
                          {student.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Toggle Status Button - ADD THIS */}
                          <button
                            onClick={() =>
                              handleToggleStatus(student.id, student.is_active)
                            }
                            disabled={toggleLoading[student.id]}
                            className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-md border ${
                              student.is_active
                                ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-600 hover:from-emerald-500/30 hover:to-teal-500/30 border-emerald-500/30"
                                : "bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 border-red-500/30"
                            } ${
                              toggleLoading[student.id]
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            title={
                              student.is_active
                                ? "Deactivate Student"
                                : "Activate Student"
                            }
                          >
                            {toggleLoading[student.id] ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Power className="w-4 h-4" />
                            )}
                          </button>

                          {/* View Details Button */}
                          <button
                            onClick={() => handleViewDetails(student.id)}
                            className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-blue-500/30"
                            title="View Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Delete student:", student.id);
                            }}
                            className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-red-500/30"
                            title="Delete Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Subject Performance Chart */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Average Performance by Subject
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <defs>
                <linearGradient id="subjectBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="average"
                fill="url(#subjectBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution Pie Chart */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Grade Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${value}`}
              >
                {gradeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend Chart */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Enrollment Growth Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={enrollmentTrendData}>
              <defs>
                <linearGradient
                  id="enrollmentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#enrollmentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Age Group Distribution - NOW DYNAMIC */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Student Age Distribution
          </h2>
          {ageDistribution.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <p>No age data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bulk Upload Modal - SIMPLIFIED WITHOUT DEMO SECTION */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-xl w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Bulk Upload Students
              </h2>
              <button
                onClick={() => setShowBulkUploadModal(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Student Data (CSV or Excel)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Make sure to download the template first and fill it with
                  student data
                </p>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="bulk-upload-input"
                  />
                  <label
                    htmlFor="bulk-upload-input"
                    className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-emerald-400 focus:outline-none"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploadFile
                        ? uploadFile.name
                        : "Click to select CSV or Excel file"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Supported formats: .csv, .xlsx, .xls
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {uploadError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700">{uploadSuccess}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBulkUploadModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                  disabled={uploadLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || uploadLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {uploadLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Students
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admit Student Modal */}
      {showAdmitForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-2xl w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admit New Student
              </h2>
              <button
                onClick={() => setShowAdmitForm(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="Enter student name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                      placeholder="student@school.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                      placeholder="+1 234-567-8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                    >
                      <option value="">Select Grade</option>
                      <option value="1st Grade">1st Grade</option>
                      <option value="2nd Grade">2nd Grade</option>
                      <option value="3rd Grade">3rd Grade</option>
                      <option value="4th Grade">4th Grade</option>
                      <option value="5th Grade">5th Grade</option>
                      <option value="6th Grade">6th Grade</option>
                      <option value="7th Grade">7th Grade</option>
                      <option value="8th Grade">8th Grade</option>
                      <option value="9th Grade">9th Grade</option>
                      <option value="10th Grade">10th Grade</option>
                      <option value="11th Grade">11th Grade</option>
                      <option value="12th Grade">12th Grade</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="5"
                      max="20"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                      placeholder="Enter age"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                      placeholder="Street address"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200/50 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Guardian Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guardian Name
                    </label>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                      placeholder="Parent/Guardian name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guardian Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                        placeholder="+1 234-567-8900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdmitForm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                >
                  Admit Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
