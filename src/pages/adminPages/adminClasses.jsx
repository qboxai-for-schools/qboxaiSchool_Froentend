import { School, Users, BookOpen, TrendingUp } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  BarChart,
  Bar,
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

const classStrengthData = [
  { class: "Grade 1", students: 35 },
  { class: "Grade 2", students: 38 },
  { class: "Grade 3", students: 42 },
  { class: "Grade 4", students: 40 },
  { class: "Grade 5", students: 36 },
  { class: "Grade 6", students: 39 },
];

const performanceData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 88 },
  { subject: "English", score: 82 },
  { subject: "History", score: 79 },
  { subject: "Arts", score: 90 },
  { subject: "PE", score: 87 },
];

export default function Classes() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Classes Management
        </h1>
        <p className="text-gray-600">
          Overview of all classes and their performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Classes"
          value="24"
          change="+2"
          icon={School}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Classes"
          value="22"
          change="+1"
          icon={BookOpen}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Class Size"
          value="38"
          change="+3"
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Performance"
          value="85%"
          change="+4%"
          icon={TrendingUp}
          trend="up"
          color="pink"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Class Strength
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classStrengthData}>
              <defs>
                <linearGradient id="classBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#db2777" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(236, 72, 153, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="students"
                fill="url(#classBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Subject Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#f59e0b"
                fill="url(#radarGradient)"
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
