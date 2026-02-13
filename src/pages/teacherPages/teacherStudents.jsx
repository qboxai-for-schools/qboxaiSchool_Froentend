import { Users, TrendingUp, BookOpen, Mail, Phone, Eye, MessageSquare } from "lucide-react";
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

const attendanceData = [
  { name: "Week 1", present: 28, absent: 2 },
  { name: "Week 2", present: 29, absent: 1 },
  { name: "Week 3", present: 27, absent: 3 },
  { name: "Week 4", present: 30, absent: 0 },
];

const performanceData = [
  { student: "John", score: 85 },
  { student: "Sarah", score: 92 },
  { student: "Mike", score: 78 },
  { student: "Emma", score: 88 },
  { student: "Alex", score: 95 },
];

// Detailed student list
const studentsList = [
  {
    id: 1,
    rollNo: "2024001",
    name: "John Smith",
    email: "john.smith@school.com",
    phone: "+1 234-567-8901",
    attendance: 95,
    avgScore: 85,
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    rollNo: "2024002",
    name: "Sarah Johnson",
    email: "sarah.j@school.com",
    phone: "+1 234-567-8902",
    attendance: 98,
    avgScore: 92,
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    rollNo: "2024003",
    name: "Mike Wilson",
    email: "mike.w@school.com",
    phone: "+1 234-567-8903",
    attendance: 88,
    avgScore: 78,
    status: "Active",
    lastActive: "5 hours ago",
  },
  {
    id: 4,
    rollNo: "2024004",
    name: "Emma Davis",
    email: "emma.d@school.com",
    phone: "+1 234-567-8904",
    attendance: 92,
    avgScore: 88,
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    rollNo: "2024005",
    name: "Alex Brown",
    email: "alex.b@school.com",
    phone: "+1 234-567-8905",
    attendance: 97,
    avgScore: 95,
    status: "Active",
    lastActive: "30 mins ago",
  },
  {
    id: 6,
    rollNo: "2024006",
    name: "Lisa Martinez",
    email: "lisa.m@school.com",
    phone: "+1 234-567-8906",
    attendance: 90,
    avgScore: 82,
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: 7,
    rollNo: "2024007",
    name: "David Lee",
    email: "david.l@school.com",
    phone: "+1 234-567-8907",
    attendance: 85,
    avgScore: 75,
    status: "Needs Attention",
    lastActive: "2 days ago",
  },
  {
    id: 8,
    rollNo: "2024008",
    name: "Jessica Taylor",
    email: "jessica.t@school.com",
    phone: "+1 234-567-8908",
    attendance: 94,
    avgScore: 89,
    status: "Active",
    lastActive: "4 hours ago",
  },
];

// Helper function to get attendance color
const getAttendanceColor = (attendance) => {
  if (attendance >= 90) return "text-green-600";
  if (attendance >= 75) return "text-orange-600";
  return "text-red-600";
};

// Helper function to get score color
const getScoreColor = (score) => {
  if (score >= 85) return "text-green-600 bg-green-50";
  if (score >= 70) return "text-blue-600 bg-blue-50";
  return "text-orange-600 bg-orange-50";
};

// Helper function to get status color
const getStatusColor = (status) => {
  if (status === "Active") return "bg-green-100 text-green-700";
  return "bg-red-100 text-red-700";
};

export default function TeacherStudents() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Students</h1>
        <p className="text-gray-600">Manage your class students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value="30"
          change="+2"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Avg Attendance"
          value="93%"
          change="+3%"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Score"
          value="87%"
          change="+5%"
          icon={BookOpen}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Attendance
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceData}>
              <defs>
                <linearGradient id="presentBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="present"
                fill="url(#presentBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Top Performers
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <defs>
                <linearGradient id="scoreLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="student" />
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

      {/* NEW SECTION: Student List */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Directory
          </h2>
          <div className="flex gap-3">
            <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Students</option>
              <option>Active</option>
              <option>Needs Attention</option>
            </select>
            <input
              type="text"
              placeholder="Search students..."
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Roll No.
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Student Name
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Contact
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Attendance
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                  Avg Score
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
              {studentsList.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-gray-600">
                      {student.rollNo}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last active: {student.lastActive}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        <span className="text-xs">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{student.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`text-lg font-bold ${getAttendanceColor(
                        student.attendance
                      )}`}
                    >
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                        student.avgScore
                      )}`}
                    >
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                        title="Send Message"
                      >
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      </button>
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