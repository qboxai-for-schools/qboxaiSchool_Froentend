import { Users, TrendingUp, BookOpen } from "lucide-react";
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

const attendanceData = [
  { name: "Week 1", present: 28, absent: 2 },
  { name: "Week 2", present: 29, absent: 1 },
  { name: "Week 3", present: 27, absent: 3 },
  { name: "Week 4", present: 30, absent: 0 },
];

const performanceData = [
  { student: "John", score: 85 },
  { student: "Sarah", score: 92 },
  { student: "Mike", score: 78 },
  { student: "Emma", score: 88 },
  { student: "Alex", score: 95 },
];

export default function TeacherStudents() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Students</h1>
        <p className="text-gray-600">Manage your class students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value="30"
          change="+2"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Avg Attendance"
          value="93%"
          change="+3%"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Score"
          value="87%"
          change="+5%"
          icon={BookOpen}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Attendance
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceData}>
              <defs>
                <linearGradient id="presentBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="present"
                fill="url(#presentBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Top Performers
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <defs>
                <linearGradient id="scoreLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="student" />
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
                dataKey="score"
                stroke="url(#scoreLine)"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
