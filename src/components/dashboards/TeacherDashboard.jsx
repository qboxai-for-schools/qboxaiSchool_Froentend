import {
  Users,
  BookOpen,
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Trophy,
} from "lucide-react";
import StatsCard from "../StatsCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const attendanceData = [
  { day: "Mon", present: 85, absent: 15, total: 100 },
  { day: "Tue", present: 92, absent: 8, total: 100 },
  { day: "Wed", present: 88, absent: 12, total: 100 },
  { day: "Thu", present: 95, absent: 5, total: 100 },
  { day: "Fri", present: 78, absent: 22, total: 100 },
];

const gradeDistribution = [
  { grade: "A+", count: 12, fill: "#10b981" },
  { grade: "A", count: 24, fill: "#3b82f6" },
  { grade: "B+", count: 18, fill: "#8b5cf6" },
  { grade: "B", count: 15, fill: "#f59e0b" },
  { grade: "C+", count: 8, fill: "#ec4899" },
  { grade: "C", count: 5, fill: "#ef4444" },
];

const classPerformance = [
  { subject: "Physics", average: 85, target: 90 },
  { subject: "Math", average: 88, target: 90 },
  { subject: "Chemistry", average: 82, target: 90 },
  { subject: "English", average: 79, target: 90 },
  { subject: "Biology", average: 86, target: 90 },
];

const upcomingClasses = [
  {
    subject: "Advanced Physics",
    class: "Class 12A",
    time: "09:00 AM",
    students: 35,
  },
  {
    subject: "Quantum Mechanics",
    class: "Class 12B",
    time: "11:00 AM",
    students: 32,
  },
  {
    subject: "Lab Session",
    class: "Class 11A",
    time: "02:00 PM",
    students: 28,
  },
];

const assignmentProgress = [
  { name: "Submitted", value: 80, fill: "#10b981" },
  { name: "Pending", value: 15, fill: "#f59e0b" },
  { name: "Late", value: 5, fill: "#ef4444" },
];

const topStudents = [
  { name: "Alex Johnson", grade: "A+", average: 98, trend: "up" },
  { name: "Maria Garcia", grade: "A+", average: 96, trend: "up" },
  { name: "James Wilson", grade: "A", average: 94, trend: "stable" },
  { name: "Emma Davis", grade: "A", average: 92, trend: "up" },
];

export default function TeacherDashboard() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Teacher Dashboard
            </span>
            <Sparkles className="w-7 h-7 text-indigo-500" />
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your classes and track student progress
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="My Students"
          value="156"
          change="3 classes"
          trend="neutral"
          icon={Users}
          color="indigo"
        />
        <StatsCard
          title="Active Courses"
          value="5"
          change="This semester"
          trend="neutral"
          icon={BookOpen}
          color="blue"
        />
        <StatsCard
          title="Assignments"
          value="12"
          change="3 pending"
          trend="neutral"
          icon={ClipboardList}
          color="cyan"
        />
        <StatsCard
          title="Hours Today"
          value="6h"
          change="2 remaining"
          trend="neutral"
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Charts Row 1 - Area & Line Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance Trend - Stacked Area Chart */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Weekly Attendance
              </h3>
              <p className="text-sm text-gray-600">
                Student attendance this week
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600" />
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600" />
                <span className="text-sm text-gray-600">Absent</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="present"
                stackId="1"
                stroke="#10b981"
                fill="url(#colorPresent)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="absent"
                stackId="1"
                stroke="#ef4444"
                fill="url(#colorAbsent)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Class Performance - Multi-line Chart */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Class Performance
              </h3>
              <p className="text-sm text-gray-600">Average vs Target scores</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={classPerformance}>
              <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 - Colorful Bar & Pie Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grade Distribution - Rainbow Bar Chart */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Grade Distribution
              </h3>
              <p className="text-sm text-gray-600">Current semester grades</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={gradeDistribution}>
              <defs>
                {gradeDistribution.map((entry, index) => (
                  <linearGradient
                    key={index}
                    id={`gradeGradient${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={entry.fill}
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="95%"
                      stopColor={entry.fill}
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="grade" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {gradeDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradeGradient${index})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assignment Progress - Pie Chart */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Assignment Status
              </h3>
              <p className="text-sm text-gray-600">Overall submission rate</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <defs>
                <linearGradient id="submitted" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="pending" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="late" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <Pie
                data={assignmentProgress}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value}%`}
              >
                <Cell fill="url(#submitted)" />
                <Cell fill="url(#pending)" />
                <Cell fill="url(#late)" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row - Lists with Glass Effect */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {"Today's Classes"}
            </h3>
            <button className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700 font-medium">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingClasses.map((cls, index) => {
              const gradients = [
                "from-blue-500 to-indigo-500",
                "from-purple-500 to-pink-500",
                "from-cyan-500 to-teal-500",
              ];
              return (
                <div
                  key={cls.subject}
                  className="flex items-center gap-4 p-3 glass rounded-xl hover:bg-white/80 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-lg`}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {cls.subject}
                    </p>
                    <p className="text-xs text-gray-600">
                      {cls.class} • {cls.students} students
                    </p>
                  </div>
                  <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                    {cls.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Students with Trophy Icon */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Top Performers
              <Trophy className="w-5 h-5 text-yellow-500" />
            </h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            {topStudents.map((student, index) => {
              const gradients = [
                "from-yellow-400 to-orange-500",
                "from-purple-400 to-pink-500",
                "from-blue-400 to-cyan-500",
                "from-green-400 to-teal-500",
              ];
              const medals = ["🥇", "🥈", "🥉", "⭐"];
              return (
                <div
                  key={student.name}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/80 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-lg text-2xl`}
                  >
                    {medals[index]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {student.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      Average: {student.average}%
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-semibold shadow-sm">
                    {student.grade}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
