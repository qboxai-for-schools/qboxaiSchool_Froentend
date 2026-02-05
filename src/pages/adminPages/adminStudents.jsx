import { GraduationCap, TrendingUp, Users, Award } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 320 },
  { month: "Feb", students: 335 },
  { month: "Mar", students: 348 },
  { month: "Apr", students: 362 },
  { month: "May", students: 378 },
  { month: "Jun", students: 385 },
];

const gradeData = [
  { name: "A+", value: 85, color: "#10b981" },
  { name: "A", value: 120, color: "#3b82f6" },
  { name: "B+", value: 95, color: "#8b5cf6" },
  { name: "B", value: 65, color: "#f59e0b" },
  { name: "C", value: 20, color: "#ef4444" },
];

export default function Students() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Students Management
        </h1>
        <p className="text-gray-600">
          Track student enrollment and performance
        </p>
      </div>

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
          icon={Users}
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
          title="Top Performers"
          value="85"
          change="+5"
          icon={Award}
          trend="up"
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Enrollment Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={enrollmentData}>
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

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Grade Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {gradeData.map((entry, index) => (
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
    </div>
  );
}
