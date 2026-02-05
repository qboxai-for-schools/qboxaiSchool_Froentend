import { ClipboardList, CheckCircle, Clock } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const submissionData = [
  { week: "Week 1", submitted: 28, pending: 2 },
  { week: "Week 2", submitted: 30, pending: 0 },
  { week: "Week 3", submitted: 25, pending: 5 },
  { week: "Week 4", submitted: 29, pending: 1 },
];

const statusData = [
  { name: "Graded", value: 65, color: "#10b981" },
  { name: "Pending", value: 15, color: "#f59e0b" },
  { name: "Late", value: 8, color: "#ef4444" },
];

export default function TeacherAssignments() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignments</h1>
        <p className="text-gray-600">Manage and track assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Assignments"
          value="12"
          change="+3"
          icon={ClipboardList}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Graded"
          value="65"
          change="+8"
          icon={CheckCircle}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Pending"
          value="15"
          change="-5"
          icon={Clock}
          trend="down"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Submission Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={submissionData}>
              <defs>
                <linearGradient id="submittedBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="pendingBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="submitted"
                fill="url(#submittedBar)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="pending"
                fill="url(#pendingBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Grading Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
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
