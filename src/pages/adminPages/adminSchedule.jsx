import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Plus,
  Upload,
  X,
  Edit,
  Trash2,
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

const weeklySchedule = [
  { day: "Mon", classes: 8, labs: 3 },
  { day: "Tue", classes: 7, labs: 4 },
  { day: "Wed", classes: 9, labs: 2 },
  { day: "Thu", classes: 6, labs: 5 },
  { day: "Fri", classes: 8, labs: 3 },
];

const utilizationData = [
  { time: "8AM", utilization: 75 },
  { time: "9AM", utilization: 85 },
  { time: "10AM", utilization: 92 },
  { time: "11AM", utilization: 88 },
  { time: "12PM", utilization: 45 },
  { time: "1PM", utilization: 70 },
  { time: "2PM", utilization: 95 },
  { time: "3PM", utilization: 82 },
  { time: "4PM", utilization: 60 },
];

const timetableData = [
  {
    id: 1,
    class: "Grade 1-A",
    time: "8:00 AM - 9:00 AM",
    monday: { subject: "Mathematics", teacher: "John Smith", room: "101" },
    tuesday: { subject: "English", teacher: "Sarah Johnson", room: "102" },
    wednesday: { subject: "Science", teacher: "Mike Davis", room: "103" },
    thursday: { subject: "History", teacher: "Emily Brown", room: "104" },
    friday: { subject: "Arts", teacher: "Lisa Anderson", room: "105" },
  },
  {
    id: 2,
    class: "Grade 1-A",
    time: "9:00 AM - 10:00 AM",
    monday: { subject: "English", teacher: "Sarah Johnson", room: "102" },
    tuesday: { subject: "Science", teacher: "Mike Davis", room: "103" },
    wednesday: { subject: "Mathematics", teacher: "John Smith", room: "101" },
    thursday: { subject: "PE", teacher: "David Wilson", room: "Gym" },
    friday: { subject: "Music", teacher: "Anna Lee", room: "106" },
  },
  {
    id: 3,
    class: "Grade 2-B",
    time: "8:00 AM - 9:00 AM",
    monday: { subject: "Science", teacher: "Mike Davis", room: "103" },
    tuesday: { subject: "Mathematics", teacher: "John Smith", room: "101" },
    wednesday: { subject: "English", teacher: "Sarah Johnson", room: "102" },
    thursday: { subject: "Arts", teacher: "Lisa Anderson", room: "105" },
    friday: { subject: "History", teacher: "Emily Brown", room: "104" },
  },
  {
    id: 4,
    class: "Grade 3-A",
    time: "10:00 AM - 11:00 AM",
    monday: { subject: "History", teacher: "Emily Brown", room: "104" },
    tuesday: { subject: "PE", teacher: "David Wilson", room: "Gym" },
    wednesday: { subject: "Science", teacher: "Mike Davis", room: "103" },
    thursday: { subject: "Mathematics", teacher: "John Smith", room: "101" },
    friday: { subject: "English", teacher: "Sarah Johnson", room: "102" },
  },
  {
    id: 5,
    class: "Grade 4-C",
    time: "11:00 AM - 12:00 PM",
    monday: { subject: "Mathematics", teacher: "John Smith", room: "101" },
    tuesday: { subject: "History", teacher: "Emily Brown", room: "104" },
    wednesday: { subject: "PE", teacher: "David Wilson", room: "Gym" },
    thursday: { subject: "English", teacher: "Sarah Johnson", room: "102" },
    friday: { subject: "Science", teacher: "Mike Davis", room: "103" },
  },
];

const subjectColors = {
  Mathematics:
    "from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-500/30",
  English:
    "from-purple-500/20 to-pink-500/20 text-purple-700 border-purple-500/30",
  Science:
    "from-emerald-500/20 to-teal-500/20 text-emerald-700 border-emerald-500/30",
  History:
    "from-orange-500/20 to-amber-500/20 text-orange-700 border-orange-500/30",
  Arts: "from-rose-500/20 to-pink-500/20 text-rose-700 border-rose-500/30",
  PE: "from-lime-500/20 to-green-500/20 text-lime-700 border-lime-500/30",
  Music:
    "from-violet-500/20 to-fuchsia-500/20 text-violet-700 border-violet-500/30",
};

export default function Schedule() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    class: "",
    time: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Schedule:", formData);
    setShowCreateForm(false);
    setFormData({ class: "", time: "" });
  };

  const handleBulkUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls,.json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log("Uploaded file:", file);
    };
    input.click();
  };

  const renderScheduleCell = (scheduleItem) => {
    if (!scheduleItem)
      return <td className="py-4 px-3 text-center text-gray-400">-</td>;

    return (
      <td className="py-4 px-3">
        <div
          className={`p-3 rounded-lg bg-gradient-to-br ${subjectColors[scheduleItem.subject] || "from-gray-500/20 to-gray-600/20 text-gray-700 border-gray-500/30"} border backdrop-blur-sm`}
        >
          <div className="font-semibold text-sm mb-1">
            {scheduleItem.subject}
          </div>
          <div className="text-xs opacity-80">{scheduleItem.teacher}</div>
          <div className="text-xs opacity-60 mt-1">
            Room: {scheduleItem.room}
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="p-8">
      {/* Header with Buttons */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Schedule Management
          </h1>
          <p className="text-gray-600">
            Manage class schedules and room utilization
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
            Create Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Today's Classes"
          value="28"
          change="+2"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Rooms"
          value="18"
          change="+1"
          icon={Users}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Peak Hours"
          value="2-4PM"
          change="95%"
          icon={Clock}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Utilization"
          value="78%"
          change="+5%"
          icon={Calendar}
          trend="up"
          color="orange"
        />
      </div>

      {/* Timetable */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Weekly Timetable
          </h2>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-lg bg-white/50 border border-gray-300/50 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none backdrop-blur-sm">
              <option>All Classes</option>
              <option>Grade 1-A</option>
              <option>Grade 2-B</option>
              <option>Grade 3-A</option>
              <option>Grade 4-C</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/50">
                <th className="text-left py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm">
                  Class
                </th>
                <th className="text-left py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm">
                  Time
                </th>
                <th className="text-center py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
                  Monday
                </th>
                <th className="text-center py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm">
                  Tuesday
                </th>
                <th className="text-center py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
                  Wednesday
                </th>
                <th className="text-center py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm">
                  Thursday
                </th>
                <th className="text-center py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-sm">
                  Friday
                </th>
                <th className="text-center py-4 px-3 font-semibold text-gray-700 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {timetableData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/5 hover:via-fuchsia-500/5 hover:to-pink-500/5 transition-all duration-300"
                >
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-xs shadow-md">
                        {row.class.split("-")[0].replace("Grade ", "")}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">
                        {row.class}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium">{row.time}</span>
                    </div>
                  </td>
                  {renderScheduleCell(row.monday)}
                  {renderScheduleCell(row.tuesday)}
                  {renderScheduleCell(row.wednesday)}
                  {renderScheduleCell(row.thursday)}
                  {renderScheduleCell(row.friday)}
                  <td className="py-4 px-3">
                    <div className="flex gap-2 justify-center">
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
            Weekly Schedule
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySchedule}>
              <defs>
                <linearGradient id="classesBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="labsBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="classes"
                fill="url(#classesBar)"
                radius={[8, 8, 0, 0]}
              />
              <Bar dataKey="labs" fill="url(#labsBar)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Room Utilization
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationData}>
              <defs>
                <linearGradient
                  id="utilizationLine"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="utilization"
                stroke="url(#utilizationLine)"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create Schedule Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create Schedule
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
                  Class
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., Grade 1-A"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slot
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., 8:00 AM - 9:00 AM"
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
