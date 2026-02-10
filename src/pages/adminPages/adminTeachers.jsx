import { useState } from "react";
import {
  Users,
  TrendingUp,
  Award,
  Calendar,
  Plus,
  Upload,
  X,
  Mail,
  Phone,
  BookOpen,
  Edit,
  Trash2,
  Activity,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { name: "John Smith", rating: 4.8, classes: 12 },
  { name: "Sarah Johnson", rating: 4.9, classes: 15 },
  { name: "Mike Davis", rating: 4.7, classes: 10 },
  { name: "Emily Brown", rating: 4.6, classes: 13 },
  { name: "David Wilson", rating: 4.9, classes: 14 },
  { name: "Lisa Anderson", rating: 4.8, classes: 11 },
];

const attendanceData = [
  { month: "Jan", present: 95 },
  { month: "Feb", present: 93 },
  { month: "Mar", present: 96 },
  { month: "Apr", present: 94 },
  { month: "May", present: 97 },
  { month: "Jun", present: 95 },
];

const teachersList = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@school.com",
    phone: "+1 234-567-8901",
    subject: "Mathematics",
    rating: 4.8,
    classes: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@school.com",
    phone: "+1 234-567-8902",
    subject: "English",
    rating: 4.9,
    classes: 15,
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.d@school.com",
    phone: "+1 234-567-8903",
    subject: "Science",
    rating: 4.7,
    classes: 10,
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.b@school.com",
    phone: "+1 234-567-8904",
    subject: "History",
    rating: 4.6,
    classes: 13,
    status: "On Leave",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@school.com",
    phone: "+1 234-567-8905",
    subject: "Physics",
    rating: 4.9,
    classes: 14,
    status: "Active",
  },
];

export default function Teachers() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Teacher:", formData);
    setShowCreateForm(false);
    setFormData({ name: "", email: "", phone: "", subject: "" });
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
            Teachers Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor teacher performance
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
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Plus className="w-5 h-5" />
            Create Teacher
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Teachers"
          value="48"
          change="+3"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Today"
          value="45"
          change="+2"
          icon={Activity}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Avg Rating"
          value="4.8"
          change="+0.2"
          icon={Award}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="On Leave"
          value="3"
          change="-1"
          icon={Calendar}
          trend="down"
          color="purple"
        />
      </div>

      {/* Teachers List */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Teachers List
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
                  Subject
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Rating
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Classes
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
              {teachersList.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-fuchsia-500/10 hover:to-pink-500/10 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold shadow-md">
                        {teacher.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {teacher.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{teacher.email}</td>
                  <td className="py-4 px-4 text-gray-600">{teacher.phone}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 text-sm font-medium border border-blue-500/30">
                      {teacher.subject}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-gray-800">
                        {teacher.rating}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">
                    {teacher.classes}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        teacher.status === "Active"
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
                          : "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 border border-orange-500/30"
                      }`}
                    >
                      {teacher.status}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Teacher Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <defs>
                <linearGradient id="teacherBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="rating"
                fill="url(#teacherBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Attendance Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <defs>
                <linearGradient id="attendanceLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis domain={[90, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="present"
                stroke="url(#attendanceLine)"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create Teacher Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create New Teacher
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                  placeholder="Enter full name"
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="teacher@school.com"
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="+1 234-567-8900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., Mathematics"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
                >
                  Create Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
