import { FileText, Award, BookOpen } from "lucide-react";
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

const termGrades = [
  { term: "Term 1", grade: 85 },
  { term: "Term 2", grade: 88 },
  { term: "Term 3", grade: 90 },
  { term: "Term 4", grade: 92 },
];

const subjectScores = [
  { subject: "Math", score: 92 },
  { subject: "Physics", score: 88 },
  { subject: "Chemistry", score: 85 },
  { subject: "English", score: 95 },
  { subject: "History", score: 90 },
  { subject: "Biology", score: 87 },
];

export default function StudentReportCard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Report Card</h1>
        <p className="text-gray-600">View your detailed academic report</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Overall Grade"
          value="A"
          change="+1"
          icon={Award}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Subjects Passed"
          value="15/15"
          change="+3"
          icon={BookOpen}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Score"
          value="89%"
          change="+4%"
          icon={FileText}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Term Performance
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={termGrades}>
              <defs>
                <linearGradient id="termLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="term" />
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
                dataKey="grade"
                stroke="url(#termLine)"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Subject Scores
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subjectScores}>
              <defs>
                <linearGradient id="subjectBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="subject"
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="score"
                fill="url(#subjectBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
