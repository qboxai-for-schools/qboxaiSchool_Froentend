import {
  Users,
  GraduationCap,
  School,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import StatsCard from "../StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 420, teachers: 45 },
  { month: "Feb", students: 480, teachers: 48 },
  { month: "Mar", students: 520, teachers: 52 },
  { month: "Apr", students: 580, teachers: 55 },
  { month: "May", students: 620, teachers: 58 },
  { month: "Jun", students: 680, teachers: 62 },
];

const departmentData = [
  { name: "Science", students: 320, fill: "#3b82f6" },
  { name: "Arts", students: 280, fill: "#8b5cf6" },
  { name: "Commerce", students: 240, fill: "#ec4899" },
  { name: "Tech", students: 180, fill: "#10b981" },
];

const performanceData = [
  { name: "Excellent", value: 35, color: "#10b981" },
  { name: "Good", value: 40, color: "#3b82f6" },
  { name: "Average", value: 20, color: "#f59e0b" },
  { name: "Needs Help", value: 5, color: "#ef4444" },
];

const facultyPerformance = [
  { subject: "Teaching", score: 85 },
  { subject: "Research", score: 78 },
  { subject: "Innovation", score: 90 },
  { subject: "Leadership", score: 82 },
  { subject: "Collaboration", score: 88 },
];

const monthlyRevenue = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 55000 },
  { month: "Jun", amount: 67000 },
];

const recentTeachers = [
  { name: "Dr. Sarah Wilson", department: "Physics", status: "Active" },
  { name: "Prof. John Smith", department: "Mathematics", status: "Active" },
  { name: "Ms. Emily Brown", department: "English", status: "On Leave" },
  { name: "Mr. David Lee", department: "Computer Science", status: "Active" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-8 space-y-6">
      {/* Header with Subtle Gradient Glass */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400/10 via-blue-400/10 to-purple-400/10 rounded-3xl blur-2xl"></div>
        <div className="relative bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                Qboxai-School
                <Sparkles className="w-8 h-8 text-purple-500 opacity-70 animate-pulse" />
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Manage your institution with AI-powered insightss
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Teachers"
          value="156"
          change="+12 this month"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Students"
          value="2,847"
          change="+89 this month"
          trend="up"
          icon={GraduationCap}
          color="indigo"
        />
        <StatsCard
          title="Active Classes"
          value="48"
          change="+3 this month"
          trend="up"
          icon={School}
          color="cyan"
        />
        <StatsCard
          title="Courses"
          value="124"
          change="+8 this month"
          trend="up"
          icon={BookOpen}
          color="purple"
        />
      </div>

      {/* Charts Row 1 - Line & Area Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-300/50 via-blue-300/50 to-purple-300/50 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Student & Teacher Growth
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Monthly enrollment trends
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/90 to-green-500/90 text-white px-4 py-2 rounded-full shadow-md shadow-green-500/20">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold text-sm">+12.5%</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50/80 to-blue-50/50 rounded-2xl p-5">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={enrollmentData}>
                  <defs>
                    <linearGradient
                      id="colorStudents"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorTeachers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      borderRadius: "16px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="teachers"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300/50 via-teal-300/50 to-cyan-300/50 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Monthly Revenue
                </h3>
                <p className="text-sm text-gray-600 mt-1">Financial overview</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-5">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      borderRadius: "16px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 - Bar & Radar Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300/50 via-purple-300/50 to-pink-300/50 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Department Distribution
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Students per department
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl p-5">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={departmentData}>
                  <defs>
                    {departmentData.map((entry, index) => (
                      <linearGradient
                        key={index}
                        id={`barGradient${index}`}
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
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      borderRadius: "16px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="students" radius={[12, 12, 0, 0]}>
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#barGradient${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Faculty Performance */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300/50 via-pink-300/50 to-fuchsia-300/50 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Faculty Performance
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Key performance indicators
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-50/50 to-pink-50/50 rounded-2xl p-5">
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={facultyPerformance}
                >
                  <defs>
                    <linearGradient
                      id="radarGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#db2777"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="#cbd5e1" strokeWidth={1.5} />
                  <PolarAngleAxis
                    dataKey="subject"
                    stroke="#475569"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <PolarRadiusAxis stroke="#94a3b8" fontSize={11} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#ec4899"
                    fill="url(#radarGradient)"
                    fillOpacity={0.6}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Pie Chart & List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300/40 via-orange-300/40 to-rose-300/40 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Performance Overview
            </h3>
            <div className="bg-gradient-to-br from-amber-50/30 to-orange-50/30 rounded-2xl p-4">
              <div className="flex items-center justify-center">
                <ResponsiveContainer width={220} height={220}>
                  <PieChart>
                    <defs>
                      <linearGradient
                        id="pieGradient1"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#059669"
                          stopOpacity={0.9}
                        />
                      </linearGradient>
                      <linearGradient
                        id="pieGradient2"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#2563eb"
                          stopOpacity={0.9}
                        />
                      </linearGradient>
                      <linearGradient
                        id="pieGradient3"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#f59e0b"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#d97706"
                          stopOpacity={0.9}
                        />
                      </linearGradient>
                      <linearGradient
                        id="pieGradient4"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ef4444"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor="#dc2626"
                          stopOpacity={0.9}
                        />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      <Cell fill="url(#pieGradient1)" />
                      <Cell fill="url(#pieGradient2)" />
                      <Cell fill="url(#pieGradient3)" />
                      <Cell fill="url(#pieGradient4)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {performanceData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                      }}
                    />
                    <span className="text-xs text-gray-700 font-medium">
                      {item.name}
                    </span>
                    <span className="text-xs font-bold text-gray-900 ml-auto">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Teachers */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-300/40 via-gray-300/40 to-zinc-300/40 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Recent Teachers
              </h3>
              <button className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700 font-semibold transition-colors">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentTeachers.map((teacher, index) => {
                const gradients = [
                  { from: "from-blue-400", to: "to-cyan-500" },
                  { from: "from-purple-400", to: "to-pink-500" },
                  { from: "from-orange-400", to: "to-amber-500" },
                  { from: "from-emerald-400", to: "to-teal-500" },
                ];
                return (
                  <div
                    key={teacher.name}
                    className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl hover:bg-white/60 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[index].from} ${gradients[index].to} flex items-center justify-center shadow-md`}
                      >
                        <span className="text-white font-bold text-sm">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {teacher.name}
                        </p>
                        <p className="text-sm text-gray-600 font-medium">
                          {teacher.department}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm ${
                        teacher.status === "Active"
                          ? "bg-gradient-to-r from-emerald-400/90 to-green-500/90 text-white"
                          : "bg-gradient-to-r from-amber-400/90 to-orange-500/90 text-white"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
