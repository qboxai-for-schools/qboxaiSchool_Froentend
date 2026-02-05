import { BookOpen, Clock, Award } from "lucide-react";
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

const enrolledCourses = [
  { name: "Mathematics", progress: 75 },
  { name: "Physics", progress: 82 },
  { name: "Chemistry", progress: 68 },
  { name: "English", progress: 90 },
  { name: "History", progress: 85 },
];

const courseStatus = [
  { name: "Completed", value: 8, color: "#10b981" },
  { name: "In Progress", value: 5, color: "#3b82f6" },
  { name: "Not Started", value: 2, color: "#f59e0b" },
];

export default function StudentCourses() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
        <p className="text-gray-600">Track your enrolled courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Courses"
          value="15"
          change="+2"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="In Progress"
          value="5"
          change="+1"
          icon={Clock}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Completed"
          value="8"
          change="+3"
          icon={Award}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Course Progress
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={enrolledCourses}>
              <defs>
                <linearGradient id="progressBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="progress"
                fill="url(#progressBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Course Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={courseStatus}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {courseStatus.map((entry, index) => (
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
