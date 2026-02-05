import { FileText, TrendingUp, Award } from "lucide-react";
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

const gradeDistribution = [
  { grade: "A+", count: 12 },
  { grade: "A", count: 18 },
  { grade: "B+", count: 25 },
  { grade: "B", count: 15 },
  { grade: "C", count: 8 },
];

const trendData = [
  { exam: "Test 1", avg: 75 },
  { exam: "Test 2", avg: 78 },
  { exam: "Mid Term", avg: 82 },
  { exam: "Test 3", avg: 85 },
  { exam: "Final", avg: 88 },
];

export default function TeacherGradeBook() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Grade Book</h1>
        <p className="text-gray-600">Track student grades and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Class Average"
          value="82%"
          change="+3%"
          icon={Award}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Highest Score"
          value="98%"
          change="+2%"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Graded Items"
          value="45"
          change="+5"
          icon={FileText}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Grade Distribution
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={gradeDistribution}>
              <defs>
                <linearGradient id="gradeBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#db2777" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="count"
                fill="url(#gradeBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Performance Trend
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <defs>
                <linearGradient id="trendLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="exam" />
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
                dataKey="avg"
                stroke="url(#trendLine)"
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
