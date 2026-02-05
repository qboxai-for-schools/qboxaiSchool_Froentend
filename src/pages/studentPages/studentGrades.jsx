import { Award, TrendingUp, Target } from "lucide-react";
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

const semesterGrades = [
  { month: "Sep", grade: 78 },
  { month: "Oct", grade: 82 },
  { month: "Nov", grade: 85 },
  { month: "Dec", grade: 88 },
  { month: "Jan", grade: 90 },
];

const subjectGrades = [
  { subject: "Math", grade: 92 },
  { subject: "Physics", grade: 88 },
  { subject: "Chemistry", grade: 85 },
  { subject: "English", grade: 95 },
  { subject: "History", grade: 90 },
];

export default function StudentGrades() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Grades</h1>
        <p className="text-gray-600">View your academic performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Overall GPA"
          value="3.8"
          change="+0.2"
          icon={Award}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Current Avg"
          value="90%"
          change="+5%"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Class Rank"
          value="12/150"
          change="+3"
          icon={Target}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Grade Progress
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={semesterGrades}>
              <defs>
                <linearGradient id="gradeGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="grade"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#gradeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Subject Grades
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={subjectGrades}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#db2777" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Grades"
                dataKey="grade"
                stroke="#ec4899"
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
