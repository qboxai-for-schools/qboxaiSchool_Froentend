import { FileText, TrendingUp, Award, Download, Edit, Save } from "lucide-react";
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

// Student grades table data
const studentGrades = [
  {
    id: 1,
    rollNo: "2024001",
    name: "John Smith",
    test1: 75,
    test2: 80,
    midterm: 85,
    test3: 88,
    final: 90,
    average: 84,
    grade: "A",
  },
  {
    id: 2,
    rollNo: "2024002",
    name: "Sarah Johnson",
    test1: 90,
    test2: 92,
    midterm: 95,
    test3: 94,
    final: 98,
    average: 94,
    grade: "A+",
  },
  {
    id: 3,
    rollNo: "2024003",
    name: "Mike Wilson",
    test1: 65,
    test2: 70,
    midterm: 72,
    test3: 75,
    final: 78,
    average: 72,
    grade: "B",
  },
  {
    id: 4,
    rollNo: "2024004",
    name: "Emma Davis",
    test1: 82,
    test2: 85,
    midterm: 88,
    test3: 90,
    final: 92,
    average: 87,
    grade: "A",
  },
  {
    id: 5,
    rollNo: "2024005",
    name: "Alex Brown",
    test1: 95,
    test2: 96,
    midterm: 98,
    test3: 97,
    final: 99,
    average: 97,
    grade: "A+",
  },
  {
    id: 6,
    rollNo: "2024006",
    name: "Lisa Martinez",
    test1: 78,
    test2: 82,
    midterm: 80,
    test3: 85,
    final: 88,
    average: 83,
    grade: "A",
  },
  {
    id: 7,
    rollNo: "2024007",
    name: "David Lee",
    test1: 60,
    test2: 65,
    midterm: 68,
    test3: 72,
    final: 75,
    average: 68,
    grade: "B",
  },
  {
    id: 8,
    rollNo: "2024008",
    name: "Jessica Taylor",
    test1: 85,
    test2: 88,
    midterm: 90,
    test3: 92,
    final: 94,
    average: 90,
    grade: "A+",
  },
];

// Helper functions
const getGradeColor = (grade) => {
  if (grade === "A+" || grade === "A") return "bg-green-100 text-green-700";
  if (grade === "B+" || grade === "B") return "bg-blue-100 text-blue-700";
  if (grade === "C+" || grade === "C") return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
};

const getScoreColor = (score) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-orange-600";
  return "text-red-600";
};

const handleExportGrades = () => {
  alert("Exporting grades to Excel/CSV...");
};

const handleEditGrade = (studentId, assignment) => {
  alert(`Edit grade for student ${studentId}, assignment: ${assignment}`);
};

const handleSaveGrades = () => {
  alert("Saving all grade changes...");
};

export default function TeacherGradeBook() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Grade Book</h1>
          <p className="text-gray-600">Track student grades and performance</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveGrades}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            onClick={handleExportGrades}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            Export Grades
          </button>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      {/* NEW SECTION: Student-wise Grade Table */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Grades Overview
          </h2>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Math A - All Students</option>
              <option>Math B - All Students</option>
              <option>Science - All Students</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-3 text-sm font-semibold text-gray-600 sticky left-0 bg-gray-50">
                  Roll No.
                </th>
                <th className="text-left py-4 px-3 text-sm font-semibold text-gray-600 sticky left-20 bg-gray-50">
                  Student Name
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600">
                  Test 1
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600">
                  Test 2
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600">
                  Midterm
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600">
                  Test 3
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600">
                  Final
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600 bg-blue-50">
                  Average
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600 bg-green-50">
                  Grade
                </th>
                <th className="text-center py-4 px-3 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-3 sticky left-0 bg-white">
                    <span className="text-sm font-mono text-gray-600">
                      {student.rollNo}
                    </span>
                  </td>
                  <td className="py-3 px-3 sticky left-20 bg-white">
                    <span className="text-sm font-semibold text-gray-800">
                      {student.name}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={`text-sm font-medium ${getScoreColor(student.test1)}`}>
                        {student.test1}
                      </span>
                      <button
                        onClick={() => handleEditGrade(student.id, "test1")}
                        className="p-1 hover:bg-blue-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-3 h-3 text-blue-600" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm font-medium ${getScoreColor(student.test2)}`}>
                      {student.test2}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm font-medium ${getScoreColor(student.midterm)}`}>
                      {student.midterm}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm font-medium ${getScoreColor(student.test3)}`}>
                      {student.test3}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-sm font-medium ${getScoreColor(student.final)}`}>
                      {student.final}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center bg-blue-50">
                    <span className="text-sm font-bold text-blue-700">
                      {student.average}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center bg-green-50">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(
                        student.grade
                      )}`}
                    >
                      {student.grade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit All Grades"
                      onClick={() => handleEditGrade(student.id, "all")}
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-100">
                <td colSpan="2" className="py-4 px-3 font-bold text-gray-800">
                  Class Average
                </td>
                <td className="py-4 px-3 text-center font-semibold text-gray-700">
                  79
                </td>
                <td className="py-4 px-3 text-center font-semibold text-gray-700">
                  82
                </td>
                <td className="py-4 px-3 text-center font-semibold text-gray-700">
                  85
                </td>
                <td className="py-4 px-3 text-center font-semibold text-gray-700">
                  87
                </td>
                <td className="py-4 px-3 text-center font-semibold text-gray-700">
                  89
                </td>
                <td className="py-4 px-3 text-center bg-blue-100 font-bold text-blue-700">
                  84%
                </td>
                <td className="py-4 px-3 text-center bg-green-100">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-200 text-green-800">
                    A
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <p>Showing 8 of 30 students</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}