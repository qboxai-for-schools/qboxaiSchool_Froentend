import { useState } from "react";
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
  Clock,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
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

// Age group distribution
const ageGroupData = [
  { name: "5-8 years", value: 95, color: "#06b6d4" },
  { name: "9-12 years", value: 145, color: "#8b5cf6" },
  { name: "13-15 years", value: 105, color: "#f59e0b" },
  { name: "16-18 years", value: 40, color: "#ec4899" },
];

const studentsList = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thompson@student.com",
    phone: "+1 234-567-1001",
    grade: "10th Grade",
    age: 15,
    address: "123 Oak Street",
    enrollmentDate: "2023-09-01",
    attendance: 96,
    gpa: 3.8,
    status: "Active",
  },
  {
    id: 2,
    name: "Liam Rodriguez",
    email: "liam.r@student.com",
    phone: "+1 234-567-1002",
    grade: "9th Grade",
    age: 14,
    address: "456 Pine Avenue",
    enrollmentDate: "2023-09-01",
    attendance: 94,
    gpa: 3.6,
    status: "Active",
  },
  {
    id: 3,
    name: "Olivia Chen",
    email: "olivia.chen@student.com",
    phone: "+1 234-567-1003",
    grade: "11th Grade",
    age: 16,
    address: "789 Maple Drive",
    enrollmentDate: "2022-09-01",
    attendance: 98,
    gpa: 4.0,
    status: "Active",
  },
  {
    id: 4,
    name: "Noah Patel",
    email: "noah.p@student.com",
    phone: "+1 234-567-1004",
    grade: "10th Grade",
    age: 15,
    address: "321 Elm Street",
    enrollmentDate: "2023-09-01",
    attendance: 92,
    gpa: 3.5,
    status: "Active",
  },
  {
    id: 5,
    name: "Sophia Williams",
    email: "sophia.w@student.com",
    phone: "+1 234-567-1005",
    grade: "12th Grade",
    age: 17,
    address: "654 Birch Lane",
    enrollmentDate: "2021-09-01",
    attendance: 88,
    gpa: 3.4,
    status: "On Leave",
  },
  {
    id: 6,
    name: "Mason Garcia",
    email: "mason.g@student.com",
    phone: "+1 234-567-1006",
    grade: "9th Grade",
    age: 14,
    address: "987 Cedar Court",
    enrollmentDate: "2023-09-01",
    attendance: 95,
    gpa: 3.7,
    status: "Active",
  },
];

export default function Students() {
  const [showAdmitForm, setShowAdmitForm] = useState(false);
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
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log("Uploaded file:", file);
      // Handle file upload logic here
    };
    input.click();
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
          value="385"
          change="+12"
          icon={GraduationCap}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Students"
          value="372"
          change="+8"
          icon={UserCheck}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Attendance"
          value="94%"
          change="+2%"
          icon={TrendingUp}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Honor Students"
          value="85"
          change="+5"
          icon={Award}
          trend="up"
          color="cyan"
        />
      </div>

      {/* Students List Table */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Students List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/50">
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
                  Grade
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Age
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Attendance
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  GPA
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
              {studentsList.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-indigo-500/10 hover:to-purple-500/10 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-md">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{student.email}</td>
                  <td className="py-4 px-4 text-gray-600">{student.phone}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 text-sm font-medium border border-purple-500/30">
                      {student.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">
                    {student.age}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {student.attendance}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-gray-800">
                        {student.gpa}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === "Active"
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
                          : "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 border border-orange-500/30"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-blue-500/30">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-red-500/30">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

        {/* Age Group Distribution */}
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Student Age Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageGroupData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {ageGroupData.map((entry, index) => (
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

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
