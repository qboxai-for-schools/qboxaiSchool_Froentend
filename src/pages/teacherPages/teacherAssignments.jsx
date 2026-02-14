import { ClipboardList, CheckCircle, Clock, Plus, Eye, Edit, MessageSquare, Download } from "lucide-react";
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

const submissionData = [
  { week: "Week 1", submitted: 28, pending: 2 },
  { week: "Week 2", submitted: 30, pending: 0 },
  { week: "Week 3", submitted: 25, pending: 5 },
  { week: "Week 4", submitted: 29, pending: 1 },
];

const statusData = [
  { name: "Graded", value: 65, color: "#10b981" },
  { name: "Pending", value: 15, color: "#f59e0b" },
  { name: "Late", value: 8, color: "#ef4444" },
];

// My Created Assignments
const myAssignments = [
  {
    id: 1,
    title: "Calculus Problem Set #5",
    subject: "Mathematics",
    class: "Math A",
    dueDate: "2026-02-15",
    totalStudents: 30,
    submitted: 28,
    graded: 25,
    pending: 3,
    status: "Active",
  },
  {
    id: 2,
    title: "Quantum Mechanics Lab Report",
    subject: "Physics",
    class: "Science",
    dueDate: "2026-02-12",
    totalStudents: 25,
    submitted: 25,
    graded: 20,
    pending: 5,
    status: "Active",
  },
  {
    id: 3,
    title: "Shakespearean Analysis Essay",
    subject: "English",
    class: "English B",
    dueDate: "2026-02-18",
    totalStudents: 28,
    submitted: 15,
    graded: 10,
    pending: 5,
    status: "Active",
  },
  {
    id: 4,
    title: "Organic Chemistry Quiz #3",
    subject: "Chemistry",
    class: "Science",
    dueDate: "2026-02-10",
    totalStudents: 30,
    submitted: 30,
    graded: 30,
    pending: 0,
    status: "Completed",
  },
];

// Submissions Pending Grading
const pendingGrading = [
  {
    id: 1,
    studentName: "John Smith",
    rollNo: "2024001",
    assignment: "Calculus Problem Set #5",
    submittedDate: "2026-02-08",
    status: "Submitted",
    isLate: false,
  },
  {
    id: 2,
    studentName: "Sarah Johnson",
    rollNo: "2024002",
    assignment: "Quantum Mechanics Lab Report",
    submittedDate: "2026-02-09",
    status: "Submitted",
    isLate: false,
  },
  {
    id: 3,
    studentName: "Mike Wilson",
    rollNo: "2024003",
    assignment: "Calculus Problem Set #5",
    submittedDate: "2026-02-16",
    status: "Submitted",
    isLate: true,
  },
  {
    id: 4,
    studentName: "Emma Davis",
    rollNo: "2024004",
    assignment: "Shakespearean Analysis Essay",
    submittedDate: "2026-02-10",
    status: "Submitted",
    isLate: false,
  },
  {
    id: 5,
    studentName: "Alex Brown",
    rollNo: "2024005",
    assignment: "Quantum Mechanics Lab Report",
    submittedDate: "2026-02-11",
    status: "Submitted",
    isLate: false,
  },
];

// Helper functions
const getStatusColor = (status) => {
  if (status === "Completed") return "bg-green-100 text-green-700";
  if (status === "Active") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
};

const getSubmissionStatusColor = (status, isLate) => {
  if (isLate) return "bg-red-100 text-red-700";
  if (status === "Submitted") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const handleCreateAssignment = () => {
  alert("Create New Assignment dialog would open here");
};

const handleGrade = (submissionId) => {
  alert(`Grade submission ${submissionId}`);
};

export default function TeacherAssignments() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignments</h1>
          <p className="text-gray-600">Manage and track assignments</p>
        </div>
        <button
          onClick={handleCreateAssignment}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Assignments"
          value="12"
          change="+3"
          icon={ClipboardList}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Graded"
          value="65"
          change="+8"
          icon={CheckCircle}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Pending"
          value="15"
          change="-5"
          icon={Clock}
          trend="up"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Submission Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={submissionData}>
              <defs>
                <linearGradient id="submittedBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
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
                dataKey="submitted"
                fill="url(#submittedBar)"
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
            Grading Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
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

      {/* NEW SECTION: My Assignments List */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          My Assignments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Assignment Title
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Class
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Submissions
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Graded
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Pending
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myAssignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {assignment.subject}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">
                      {assignment.class}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-700">
                      {formatDate(assignment.dueDate)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {assignment.submitted}/{assignment.totalStudents}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-green-600">
                      {assignment.graded}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-orange-600">
                      {assignment.pending}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        assignment.status
                      )}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Assignment"
                      >
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW SECTION: Pending Grading Queue */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Submissions Pending Grading ({pendingGrading.length})
        </h2>
        <div className="space-y-3">
          {pendingGrading.map((submission) => (
            <div
              key={submission.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {submission.studentName}
                    </h3>
                    <span className="text-sm text-gray-500 font-mono">
                      {submission.rollNo}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getSubmissionStatusColor(
                        submission.status,
                        submission.isLate
                      )}`}
                    >
                      {submission.isLate ? "Late Submission" : submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {submission.assignment}
                  </p>
                  <p className="text-xs text-gray-500">
                    Submitted: {formatDate(submission.submittedDate)}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    onClick={() => handleGrade(submission.id)}
                  >
                    <Edit className="w-4 h-4" />
                    Grade
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download Submission"
                  >
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                    title="Send Feedback"
                  >
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}