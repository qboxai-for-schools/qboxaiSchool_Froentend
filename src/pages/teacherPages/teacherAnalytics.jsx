import { BarChart3, TrendingUp, Users } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const progressData = [
  { month: "Jan", performance: 75 },
  { month: "Feb", performance: 78 },
  { month: "Mar", performance: 82 },
  { month: "Apr", performance: 85 },
  { month: "May", performance: 87 },
  { month: "Jun", performance: 90 },
];

const skillsData = [
  { skill: "Engagement", score: 85 },
  { skill: "Content", score: 90 },
  { skill: "Feedback", score: 78 },
  { skill: "Innovation", score: 82 },
  { skill: "Support", score: 88 },
];

export default function TeacherAnalytics() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics</h1>
        <p className="text-gray-600">Your teaching performance insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Performance"
          value="90%"
          change="+5%"
          icon={TrendingUp}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Student Satisfaction"
          value="4.8"
          change="+0.3"
          icon={Users}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Overall Rating"
          value="95%"
          change="+3%"
          icon={BarChart3}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Performance Progress
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={progressData}>
              <defs>
                <linearGradient
                  id="progressGradient"
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
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="performance"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#progressGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Teaching Skills
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillsData}>
              <defs>
                <linearGradient id="skillRadar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="score"
                stroke="#10b981"
                fill="url(#skillRadar)"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
