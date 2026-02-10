import { Award, TrendingUp, Target, MessageSquare } from "lucide-react";
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

// Detailed subject breakdown
const subjectBreakdown = [
  {
    subject: "Mathematics",
    currentGrade: "A+",
    average: 92,
    assignments: 12,
  },
  {
    subject: "Physics",
    currentGrade: "A",
    average: 88,
    assignments: 10,
  },
  {
    subject: "Chemistry",
    currentGrade: "A",
    average: 85,
    assignments: 11,
  },
  {
    subject: "English",
    currentGrade: "A+",
    average: 95,
    assignments: 8,
  },
  {
    subject: "History",
    currentGrade: "A+",
    average: 90,
    assignments: 9,
  },
];

// Recent graded assignments
const recentGradedAssignments = [
  {
    assignment: "Calculus Problem Set #5",
    subject: "Mathematics",
    grade: 95,
    maxGrade: 100,
    date: "Feb 5, 2026",
    feedback: "Excellent work! Your approach to solving differential equations is very methodical.",
  },
  {
    assignment: "Quantum Mechanics Lab Report",
    subject: "Physics",
    grade: 88,
    maxGrade: 100,
    date: "Feb 4, 2026",
    feedback: "Good analysis. Need more detail in the methodology section.",
  },
  {
    assignment: "Shakespearean Analysis Essay",
    subject: "English",
    grade: 92,
    maxGrade: 100,
    date: "Feb 3, 2026",
    feedback: "Outstanding literary analysis! Your interpretation of the themes is insightful.",
  },
  {
    assignment: "Organic Chemistry Quiz #3",
    subject: "Chemistry",
    grade: 85,
    maxGrade: 100,
    date: "Feb 2, 2026",
    feedback: "Good understanding of basic concepts. Practice more on reaction mechanisms.",
  },
  {
    assignment: "World War II Research Project",
    subject: "History",
    grade: 90,
    maxGrade: 100,
    date: "Feb 1, 2026",
    feedback: "Well-researched and thoroughly documented. Great use of primary sources.",
  },
];

// Helper function to get grade color
const getGradeColor = (grade) => {
  if (grade === "A+" || grade === "A") return "bg-green-100 text-green-700";
  if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-700";
  if (grade === "C+" || grade === "C") return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
};

// Helper function to get score color
const getScoreColor = (percentage) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 80) return "text-blue-600";
  if (percentage >= 70) return "text-orange-600";
  return "text-red-600";
};

export default function StudentGrades() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Grade Overview</h1>
        <p className="text-gray-600">Monitor your academic performance across subjects</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      {/* NEW SECTION: Subject-wise Grade Breakdown */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Subject Performance Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Current Grade
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Average Score
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Assignments Graded
                </th>
              </tr>
            </thead>
            <tbody>
              {subjectBreakdown.map((subject, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {subject.subject}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(
                        subject.currentGrade
                      )}`}
                    >
                      {subject.currentGrade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`text-lg font-bold ${getScoreColor(
                        subject.average
                      )}`}
                    >
                      {subject.average}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">
                    {subject.assignments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW SECTION: Recent Graded Assignments with Feedback */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Graded Assignments
        </h2>
        <div className="space-y-4">
          {recentGradedAssignments.map((assignment, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    {assignment.assignment}
                  </h3>
                  <p className="text-sm text-gray-500">{assignment.subject}</p>
                </div>
                <div className="text-right ml-4">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      (assignment.grade / assignment.maxGrade) * 100
                    )}`}
                  >
                    {assignment.grade}/{assignment.maxGrade}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{assignment.date}</p>
                </div>
              </div>
              
              {/* Teacher Feedback */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mt-3">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Teacher's Feedback
                    </p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "{assignment.feedback}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}