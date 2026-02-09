import { useState } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Plus,
  Upload,
  X,
  FileText,
  Edit,
  Trash2,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const enrollmentData = [
  { month: "Jan", math: 120, science: 110, english: 130, history: 95 },
  { month: "Feb", math: 125, science: 115, english: 135, history: 100 },
  { month: "Mar", math: 130, science: 120, english: 138, history: 105 },
  { month: "Apr", math: 135, science: 125, english: 142, history: 108 },
  { month: "May", math: 142, science: 128, english: 145, history: 112 },
  { month: "Jun", math: 148, science: 132, english: 150, history: 115 },
];

const completionData = [
  { course: "Mathematics", completion: 85 },
  { course: "Science", completion: 78 },
  { course: "English", completion: 92 },
  { course: "History", completion: 88 },
  { course: "Computer Sci", completion: 81 },
  { course: "Arts", completion: 95 },
];

const subjectsList = [
  {
    id: 1,
    name: "Mathematics",
    description: "Core subject covering algebra, geometry, and calculus",
    enrollments: 148,
    completion: 85,
    status: "Active",
  },
  {
    id: 2,
    name: "Science",
    description: "General science including physics, chemistry, and biology",
    enrollments: 132,
    completion: 78,
    status: "Active",
  },
  {
    id: 3,
    name: "English",
    description: "Core subject focusing on literature and language",
    enrollments: 150,
    completion: 92,
    status: "Active",
  },
  {
    id: 4,
    name: "History",
    description: "World history and cultural studies",
    enrollments: 115,
    completion: 88,
    status: "Active",
  },
  {
    id: 5,
    name: "Computer Science",
    description: "Programming, algorithms, and computer fundamentals",
    enrollments: 125,
    completion: 81,
    status: "Active",
  },
  {
    id: 6,
    name: "Arts",
    description: "Visual arts, music, and creative expression",
    enrollments: 98,
    completion: 95,
    status: "Inactive",
  },
];

export default function Courses() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Subject:", {
      subjects: [formData],
    });
    setShowCreateForm(false);
    setFormData({ name: "", description: "" });
  };

  const handleBulkUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls,.json";
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
            Subjects Management
          </h1>
          <p className="text-gray-600">
            Manage subjects and track completion rates
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
            Create Subject
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Subjects"
          value="42"
          change="+5"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Subjects"
          value="38"
          change="+3"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Total Enrollments"
          value="2,456"
          change="+156"
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Completion Rate"
          value="86%"
          change="+5%"
          icon={Award}
          trend="up"
          color="cyan"
        />
      </div>

      {/* Subjects List */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Subjects List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/50">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Subject Name
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Enrollments
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Completion
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
              {subjectsList.map((subject) => (
                <tr
                  key={subject.id}
                  className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-fuchsia-500/10 hover:to-pink-500/10 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-md">
                        {subject.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {subject.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs">
                    {subject.description}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-gray-800">
                        {subject.enrollments}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px] bg-gray-200/50 rounded-full h-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: `${subject.completion}%` }}
                        />
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">
                        {subject.completion}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.status === "Active"
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
                          : "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 border border-gray-500/30"
                      }`}
                    >
                      {subject.status}
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
            Subject Enrollments
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <defs>
                <linearGradient id="mathLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="scienceLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="englishLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="historyLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="math"
                stroke="url(#mathLine)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="science"
                stroke="url(#scienceLine)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="english"
                stroke="url(#englishLine)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="history"
                stroke="url(#historyLine)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Completion Rates
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionData} layout="vertical">
              <defs>
                <linearGradient
                  id="completionGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="course" type="category" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="completion"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#completionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create Subject Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create New Subject
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
                  Subject Name
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., Mathematics"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm resize-none"
                    placeholder="Enter subject description..."
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
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
