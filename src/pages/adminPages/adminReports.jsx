import { BarChart3, TrendingUp, FileText, Award } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  ComposedChart,
  Area,
  Bar,
  Line,
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

const performanceData = [
  { month: "Jan", academic: 78, attendance: 85, behavior: 88 },
  { month: "Feb", academic: 82, attendance: 87, behavior: 86 },
  { month: "Mar", academic: 85, attendance: 90, behavior: 89 },
  { month: "Apr", academic: 88, attendance: 88, behavior: 91 },
  { month: "May", academic: 90, attendance: 92, behavior: 90 },
  { month: "Jun", academic: 92, attendance: 94, behavior: 93 },
];

const reportTypes = [
  { name: "Academic", value: 156, color: "#3b82f6" },
  { name: "Attendance", value: 89, color: "#10b981" },
  { name: "Behavioral", value: 45, color: "#8b5cf6" },
  { name: "Financial", value: 67, color: "#f59e0b" },
];

export default function Reports() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">View comprehensive reports and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Reports"
          value="357"
          change="+23"
          icon={FileText}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="This Month"
          value="48"
          change="+8"
          icon={BarChart3}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Score"
          value="87%"
          change="+3%"
          icon={Award}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Improvement"
          value="12%"
          change="+4%"
          icon={TrendingUp}
          trend="up"
          color="pink"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Overall Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={performanceData}>
              <defs>
                <linearGradient
                  id="academicGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="academic"
                fill="url(#academicGradient)"
                stroke="#3b82f6"
              />
              <Bar dataKey="attendance" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Line
                type="monotone"
                dataKey="behavior"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Report Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {reportTypes.map((entry, index) => (
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
