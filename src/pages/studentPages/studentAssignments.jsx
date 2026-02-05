import { ClipboardList, CheckCircle, Clock } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { week: "Week 1", completed: 8, pending: 2 },
  { week: "Week 2", completed: 10, pending: 1 },
  { week: "Week 3", completed: 7, pending: 3 },
  { week: "Week 4", completed: 9, pending: 2 },
];

const scoreData = [
  { assignment: "Math HW", score: 95 },
  { assignment: "Physics Lab", score: 88 },
  { assignment: "English Essay", score: 92 },
  { assignment: "Chemistry Quiz", score: 85 },
  { assignment: "History Project", score: 90 },
];

export default function StudentAssignments() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Assignments
        </h1>
        <p className="text-gray-600">Track your assignments and submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Assignments"
          value="45"
          change="+5"
          icon={ClipboardList}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Completed"
          value="34"
          change="+9"
          icon={CheckCircle}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Pending"
          value="8"
          change="-2"
          icon={Clock}
          trend="down"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Submissions
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <defs>
                <linearGradient id="completedBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
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
                dataKey="completed"
                fill="url(#completedBar)"
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
            Recent Scores
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={scoreData}>
              <defs>
                <linearGradient id="scoreLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="assignment"
                angle={-15}
                textAnchor="end"
                height={80}
              />
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
