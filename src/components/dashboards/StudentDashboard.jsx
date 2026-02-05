import {
  BookOpen,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Star,
  CheckCircle2,
  Circle,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import StatsCard from "../StatsCard";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ComposedChart,
} from "recharts";

const subjectPerformance = [
  { subject: "Physics", score: 92, fullMark: 100 },
  { subject: "Math", score: 88, fullMark: 100 },
  { subject: "Chemistry", score: 85, fullMark: 100 },
  { subject: "English", score: 78, fullMark: 100 },
  { subject: "CS", score: 95, fullMark: 100 },
  { subject: "Biology", score: 82, fullMark: 100 },
];

const gradeHistory = [
  { exam: "Quiz 1", score: 85, target: 90 },
  { exam: "Mid-term", score: 78, target: 90 },
  { exam: "Quiz 2", score: 88, target: 90 },
  { exam: "Project", score: 92, target: 90 },
  { exam: "Quiz 3", score: 90, target: 90 },
  { exam: "Finals", score: 94, target: 90 },
];

const weeklyProgress = [
  { day: "Mon", hours: 6, tasks: 8 },
  { day: "Tue", hours: 7, tasks: 10 },
  { day: "Wed", hours: 5, tasks: 7 },
  { day: "Thu", hours: 8, tasks: 12 },
  { day: "Fri", hours: 6, tasks: 9 },
];

const skillsData = [
  { skill: "Problem Solving", level: 90, fill: "#3b82f6" },
  { skill: "Critical Thinking", level: 85, fill: "#8b5cf6" },
  { skill: "Collaboration", level: 88, fill: "#10b981" },
  { skill: "Time Management", level: 82, fill: "#f59e0b" },
];

const upcomingAssignments = [
  {
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Feb 15",
    status: "pending",
    priority: "high",
  },
  {
    title: "Math Problem Set #5",
    subject: "Mathematics",
    dueDate: "Feb 17",
    status: "pending",
    priority: "medium",
  },
  {
    title: "Essay: Climate Change",
    subject: "English",
    dueDate: "Feb 20",
    status: "in-progress",
    priority: "low",
  },
];

const todaySchedule = [
  {
    subject: "Advanced Physics",
    time: "09:00 - 10:30",
    room: "Room 301",
    completed: true,
  },
  {
    subject: "Mathematics",
    time: "11:00 - 12:30",
    room: "Room 205",
    completed: true,
  },
  {
    subject: "Chemistry Lab",
    time: "02:00 - 04:00",
    room: "Lab 102",
    completed: false,
  },
  {
    subject: "Computer Science",
    time: "04:30 - 06:00",
    room: "Room 401",
    completed: false,
  },
];

const reportCard = [
  { subject: "Physics", grade: "A", marks: 92, credits: 4 },
  { subject: "Mathematics", grade: "A-", marks: 88, credits: 4 },
  { subject: "Chemistry", grade: "B+", marks: 85, credits: 3 },
  { subject: "English", grade: "B", marks: 78, credits: 3 },
  { subject: "Computer Science", grade: "A+", marks: 95, credits: 3 },
];

export default function StudentDashboard() {
  const cgpa = 3.72;
  const totalCredits = 17;
  const attendance = 94;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 space-y-6">
      {/* Header with Gradient Glass */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl shadow-blue-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                Student Dashboard
                <Sparkles className="w-8 h-8 text-cyan-500 animate-pulse" />
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Track your academic progress and achievements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Enhanced Glass Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Current CGPA"
          value={cgpa.toFixed(2)}
          change="Top 10%"
          trend="up"
          icon={Award}
          color="cyan"
        />
        <StatsCard
          title="Total Credits"
          value={totalCredits.toString()}
          change="This semester"
          trend="neutral"
          icon={BookOpen}
          color="blue"
        />
        <StatsCard
          title="Attendance"
          value={`${attendance}%`}
          change="+2% from last month"
          trend="up"
          icon={Calendar}
          color="indigo"
        />
        <StatsCard
          title="Assignments"
          value="3"
          change="Due this week"
          trend="neutral"
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Charts Row 1 - Enhanced Gradient Glass */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Performance Radar */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-500/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Subject Performance
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your scores across subjects
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg shadow-green-500/30">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold text-sm">87.8% avg</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={subjectPerformance}
                >
                  <defs>
                    <linearGradient
                      id="radarGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop
                        offset="50%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                        stopOpacity={0.9}
                      />
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="#cbd5e1" strokeWidth={1.5} />
                  <PolarAngleAxis
                    dataKey="subject"
                    stroke="#475569"
                    fontSize={13}
                    fontWeight={600}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="url(#radarGradient)"
                    fillOpacity={0.7}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Grade Progress */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-purple-500/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Grade Progress
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Performance over time
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg shadow-purple-500/30">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={gradeHistory}>
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="exam"
                    stroke="#64748b"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis stroke="#64748b" fontSize={12} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      borderRadius: "16px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    fill="url(#scoreGradient)"
                    stroke="#10b981"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{
                      fill: "#f59e0b",
                      r: 5,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills Assessment */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-orange-500/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
                  Skills Assessment
                  <Zap className="w-6 h-6 text-yellow-500" />
                </h3>
                <p className="text-sm text-gray-600 mt-1">Key competencies</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50/50 to-orange-50/50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={skillsData} layout="vertical">
                  <defs>
                    {skillsData.map((entry, index) => (
                      <linearGradient
                        key={index}
                        id={`skillGradient${index}`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="5%"
                          stopColor={entry.fill}
                          stopOpacity={1}
                        />
                        <stop
                          offset="95%"
                          stopColor={entry.fill}
                          stopOpacity={0.7}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis
                    type="number"
                    stroke="#64748b"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis
                    dataKey="skill"
                    type="category"
                    stroke="#64748b"
                    fontSize={12}
                    width={140}
                    fontWeight={500}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      borderRadius: "16px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="level" radius={[0, 12, 12, 0]}>
                    {skillsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#skillGradient${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-pink-500/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Weekly Activity
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Study hours & tasks completed
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient
                      id="hoursGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#ec4899"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="tasksGradient"
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
                    dataKey="day"
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
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#ec4899"
                    fill="url(#hoursGradient)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#8b5cf6"
                    fill="url(#tasksGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report Card - Enhanced Glass Table */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Current Report Card
              </h3>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-md opacity-60"></div>
                <div className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-3 rounded-2xl shadow-lg shadow-orange-500/30">
                  <Star className="w-5 h-5 text-white fill-white" />
                  <span className="font-bold text-white">
                    CGPA: {cgpa.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 rounded-2xl p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-700 text-sm border-b-2 border-gray-300">
                    <th className="pb-4 font-bold">Subject</th>
                    <th className="pb-4 font-bold">Grade</th>
                    <th className="pb-4 font-bold">Marks</th>
                    <th className="pb-4 font-bold">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {reportCard.map((item, index) => {
                    const gradients = [
                      "from-green-500 to-emerald-600",
                      "from-blue-500 to-cyan-600",
                      "from-purple-500 to-pink-600",
                      "from-orange-500 to-red-600",
                      "from-cyan-500 to-blue-600",
                    ];
                    return (
                      <tr
                        key={item.subject}
                        className="border-b border-gray-200 hover:bg-white/70 transition-all duration-200"
                      >
                        <td className="py-5 font-semibold text-gray-900">
                          {item.subject}
                        </td>
                        <td className="py-5">
                          <span
                            className={`px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r ${gradients[index]} text-white shadow-lg hover:scale-105 transition-transform duration-200 inline-block`}
                          >
                            {item.grade}
                          </span>
                        </td>
                        <td className="py-5 text-gray-700 font-semibold">
                          {item.marks}/100
                        </td>
                        <td className="py-5 text-gray-700 font-medium">
                          {item.credits}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-indigo-500/10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {"Today's Schedule"}
            </h3>
            <div className="space-y-4">
              {todaySchedule.map((cls, index) => {
                const gradients = [
                  {
                    bg: "from-green-500 to-emerald-600",
                    text: "text-green-700",
                  },
                  { bg: "from-blue-500 to-cyan-600", text: "text-blue-700" },
                  {
                    bg: "from-purple-500 to-pink-600",
                    text: "text-purple-700",
                  },
                  { bg: "from-orange-500 to-red-600", text: "text-orange-700" },
                ];
                return (
                  <div key={cls.subject} className="flex items-start gap-3">
                    {cls.completed ? (
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-1 shadow-lg shadow-green-500/30 mt-0.5 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div
                      className={`flex-1 rounded-2xl transition-all duration-200 ${
                        cls.completed
                          ? "bg-gray-100/70 opacity-70"
                          : `bg-gradient-to-br ${gradients[index].bg} bg-opacity-10 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl hover:scale-[1.02]`
                      } p-4`}
                    >
                      <p
                        className={`font-bold text-sm ${cls.completed ? "text-gray-600" : "text-gray-900"}`}
                      >
                        {cls.subject}
                      </p>
                      <p className="text-xs text-gray-600 mt-2 font-medium">
                        {cls.time}
                      </p>
                      <p
                        className={`text-xs font-bold mt-2 ${
                          cls.completed
                            ? "text-gray-500"
                            : gradients[index].text
                        }`}
                      >
                        {cls.room}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Assignments - Enhanced */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-red-500/10">
          <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Upcoming Assignments
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingAssignments.map((assignment, index) => {
              const gradients = [
                {
                  bg: "from-red-500 to-pink-600",
                  badge: "from-red-600 to-pink-700",
                  glow: "red-500",
                },
                {
                  bg: "from-orange-500 to-yellow-600",
                  badge: "from-orange-600 to-yellow-700",
                  glow: "orange-500",
                },
                {
                  bg: "from-blue-500 to-cyan-600",
                  badge: "from-blue-600 to-cyan-700",
                  glow: "blue-500",
                },
              ];
              return (
                <div key={assignment.title} className="relative group/card">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index].bg} rounded-2xl blur opacity-40 group-hover/card:opacity-60 transition duration-300`}
                  ></div>
                  <div
                    className={`relative bg-gradient-to-br ${gradients[index].bg} bg-opacity-20 backdrop-blur-xl border border-white/50 p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r ${gradients[index].badge} text-white shadow-lg`}
                      >
                        {assignment.status === "pending"
                          ? "Pending"
                          : "In Progress"}
                      </span>
                      <div
                        className={`bg-white/50 backdrop-blur-sm p-2 rounded-lg shadow-lg shadow-${gradients[index].glow}/30`}
                      >
                        <Clock className="w-4 h-4 text-gray-700" />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">
                      {assignment.title}
                    </h4>
                    <p className="text-sm text-gray-700 mb-4 font-medium">
                      {assignment.subject}
                    </p>
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-red-500/30">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-bold">
                        Due: {assignment.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
