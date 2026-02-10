import { FileText, Award, BookOpen, Download, Calendar, User } from "lucide-react";
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

// Detailed subject grades with remarks
const detailedGrades = [
  {
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 92,
    grade: "A+",
    remarks: "Excellent performance in calculus",
  },
  {
    subject: "Physics",
    maxMarks: 100,
    obtained: 88,
    grade: "A",
    remarks: "Good understanding of concepts",
  },
  {
    subject: "Chemistry",
    maxMarks: 100,
    obtained: 85,
    grade: "A",
    remarks: "Needs improvement in organic chemistry",
  },
  {
    subject: "English",
    maxMarks: 100,
    obtained: 95,
    grade: "A+",
    remarks: "Outstanding writing skills",
  },
  {
    subject: "History",
    maxMarks: 100,
    obtained: 90,
    grade: "A+",
    remarks: "Very good analytical ability",
  },
  {
    subject: "Biology",
    maxMarks: 100,
    obtained: 87,
    grade: "A",
    remarks: "Good practical knowledge",
  },
];

// Helper function to get grade color
const getGradeColor = (grade) => {
  if (grade === "A+" || grade === "A") return "text-green-600 bg-green-50";
  if (grade === "B+" || grade === "B") return "text-blue-600 bg-blue-50";
  if (grade === "C+" || grade === "C") return "text-orange-600 bg-orange-50";
  return "text-red-600 bg-red-50";
};

// Download PDF function (placeholder)
const handleDownloadPDF = () => {
  alert("Downloading Report Card PDF...");
  // In real app, this would generate and download PDF
};

export default function StudentReportCard() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Academic Report</h1>
          <p className="text-gray-600">Detailed overview of your academic performance</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      {/* NEW SECTION: Detailed Subject Grades Table */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Detailed Subject Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Max Marks
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Marks Obtained
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Percentage
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Grade
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {detailedGrades.map((subject, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {subject.subject}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">
                    {subject.maxMarks}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-gray-800">
                    {subject.obtained}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">
                    {Math.round((subject.obtained / subject.maxMarks) * 100)}%
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(
                        subject.grade
                      )}`}
                    >
                      {subject.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 italic">
                    {subject.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td className="py-4 px-4 font-bold text-gray-800">Total</td>
                <td className="py-4 px-4 text-center font-semibold text-gray-800">
                  600
                </td>
                <td className="py-4 px-4 text-center font-bold text-gray-800">
                  537
                </td>
                <td className="py-4 px-4 text-center font-bold text-blue-600">
                  89.5%
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-50 text-green-600">
                    A
                  </span>
                </td>
                <td className="py-4 px-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* NEW SECTION: Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Summary */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Attendance Summary
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Working Days</span>
              <span className="font-semibold text-gray-800">180</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Days Present</span>
              <span className="font-semibold text-green-600">169</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Days Absent</span>
              <span className="font-semibold text-red-600">11</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-3">
              <span className="font-semibold text-gray-700">Attendance %</span>
              <span className="text-2xl font-bold text-blue-600">94%</span>
            </div>
          </div>
        </div>

        {/* Teacher's Remarks */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Class Teacher's Remarks
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 leading-relaxed">
                "Excellent academic performance throughout the semester. Shows
                strong analytical skills and consistent effort in all subjects.
                Particularly impressive work in English and Mathematics.
                Attendance has been good. Keep up the excellent work!"
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Class Teacher</p>
                  <p className="font-semibold text-gray-800">Mrs. Sarah Johnson</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">Feb 06, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}