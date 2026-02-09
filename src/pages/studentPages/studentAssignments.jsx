import { ClipboardList, CheckCircle, Clock, Download, Eye, Upload } from "lucide-react";
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

// New assignment list data
const assignmentsList = [
  {
    id: 1,
    name: "Calculus Problem Set #5",
    subject: "Mathematics",
    dueDate: "2026-02-10",
    status: "Pending",
    score: null,
  },
  {
    id: 2,
    name: "Quantum Mechanics Lab Report",
    subject: "Physics",
    dueDate: "2026-02-08",
    status: "Submitted",
    score: null,
  },
  {
    id: 3,
    name: "Shakespearean Analysis Essay",
    subject: "English",
    dueDate: "2026-02-12",
    status: "Graded",
    score: 92,
  },
  {
    id: 4,
    name: "Organic Chemistry Quiz #3",
    subject: "Chemistry",
    dueDate: "2026-02-07",
    status: "Graded",
    score: 85,
  },
  {
    id: 5,
    name: "World War II Research Project",
    subject: "History",
    dueDate: "2026-02-15",
    status: "Pending",
    score: null,
  },
  {
    id: 6,
    name: "Cell Biology Presentation",
    subject: "Biology",
    dueDate: "2026-02-09",
    status: "Submitted",
    score: null,
  },
  {
    id: 7,
    name: "Trigonometry Homework #8",
    subject: "Mathematics",
    dueDate: "2026-02-11",
    status: "Pending",
    score: null,
  },
  {
    id: 8,
    name: "Physics Lab: Pendulum Motion",
    subject: "Physics",
    dueDate: "2026-02-06",
    status: "Graded",
    score: 88,
  },
];

// Helper function to get status badge color
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-orange-100 text-orange-600";
    case "Submitted":
      return "bg-blue-100 text-blue-600";
    case "Graded":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Helper function to check if assignment is overdue
const isOverdue = (dueDate, status) => {
  const today = new Date();
  const due = new Date(dueDate);
  return status === "Pending" && due < today;
};

export default function StudentAssignments() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Assignment Performance
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Submissionss
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

      {/* NEW SECTION: Recent Assignments List */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Assignments
          </h2>
          <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>English</option>
            <option>History</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Assignment
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Score
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {assignmentsList.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">
                      {assignment.name}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {assignment.subject}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-sm ${
                        isOverdue(assignment.dueDate, assignment.status)
                          ? "text-red-600 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {formatDate(assignment.dueDate)}
                      {isOverdue(assignment.dueDate, assignment.status) && (
                        <span className="ml-1 text-xs">(Overdue)</span>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        assignment.status
                      )}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-800">
                      {assignment.score ? `${assignment.score}/100` : "-"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      {assignment.status === "Pending" && (
                        <button
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Submit Assignment"
                        >
                          <Upload className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                      {assignment.status === "Graded" && (
                        <button
                          className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4 text-purple-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}