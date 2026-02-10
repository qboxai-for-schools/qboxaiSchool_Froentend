import { useState } from "react";
import {
  School,
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Upload,
  X,
  User,
  GraduationCap,
  Edit,
  Trash2,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const classStrengthData = [
  { class: "Grade 1", students: 35 },
  { class: "Grade 2", students: 38 },
  { class: "Grade 3", students: 42 },
  { class: "Grade 4", students: 40 },
  { class: "Grade 5", students: 36 },
  { class: "Grade 6", students: 39 },
];

const performanceData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 88 },
  { subject: "English", score: 82 },
  { subject: "History", score: 79 },
  { subject: "Arts", score: 90 },
  { subject: "PE", score: 87 },
];

const classesList = [
  {
    id: 1,
    name: "Grade 1-A",
    teacher: "John Smith",
    students: 35,
    subject: "General",
    schedule: "Mon-Fri, 8:00 AM",
    status: "Active",
  },
  {
    id: 2,
    name: "Grade 2-B",
    teacher: "Sarah Johnson",
    students: 38,
    subject: "General",
    schedule: "Mon-Fri, 9:00 AM",
    status: "Active",
  },
  {
    id: 3,
    name: "Grade 3-A",
    teacher: "Mike Davis",
    students: 42,
    subject: "General",
    schedule: "Mon-Fri, 8:00 AM",
    status: "Active",
  },
  {
    id: 4,
    name: "Grade 4-C",
    teacher: "Emily Brown",
    students: 40,
    subject: "General",
    schedule: "Mon-Fri, 10:00 AM",
    status: "Active",
  },
  {
    id: 5,
    name: "Grade 5-B",
    teacher: "David Wilson",
    students: 36,
    subject: "General",
    schedule: "Mon-Fri, 11:00 AM",
    status: "Active",
  },
  {
    id: 6,
    name: "Grade 6-A",
    teacher: "Lisa Anderson",
    students: 39,
    subject: "General",
    schedule: "Mon-Fri, 8:00 AM",
    status: "Inactive",
  },
];

export default function Classes() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Class:", formData);
    setShowCreateForm(false);
    setFormData({ name: "", teacher: "" });
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
            Classes Management
          </h1>
          <p className="text-gray-600">
            Overview of all classes and their performance
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
            Create Class
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Classes"
          value="24"
          change="+2"
          icon={School}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Classes"
          value="22"
          change="+1"
          icon={BookOpen}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Class Size"
          value="38"
          change="+3"
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Performance"
          value="85%"
          change="+4%"
          icon={TrendingUp}
          trend="up"
          color="pink"
        />
      </div>

      {/* Classes List */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Classes List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/50">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Class Name
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Teacher
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Students
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Subject
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                  Schedule
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
              {classesList.map((classItem) => (
                <tr
                  key={classItem.id}
                  className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-fuchsia-500/10 hover:to-pink-500/10 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold shadow-md">
                        {classItem.name.split("-")[0].replace("Grade ", "")}
                      </div>
                      <span className="font-medium text-gray-800">
                        {classItem.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-violet-500" />
                      <span className="text-gray-700">{classItem.teacher}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-gray-800">
                        {classItem.students}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 text-sm font-medium border border-purple-500/30">
                      {classItem.subject}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-sm">
                    {classItem.schedule}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        classItem.status === "Active"
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
                          : "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 border border-gray-500/30"
                      }`}
                    >
                      {classItem.status}
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
            Class Strength
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classStrengthData}>
              <defs>
                <linearGradient id="classBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#db2777" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(236, 72, 153, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="students"
                fill="url(#classBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Subject Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#f59e0b"
                fill="url(#radarGradient)"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create New Class
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
                  Class Name
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., Grade 1-A"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teacher
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="Teacher name"
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
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
