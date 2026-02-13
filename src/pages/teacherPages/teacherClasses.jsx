import { BookOpen, Users, Clock, Calendar, MapPin, FileText, Download, Eye } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const classData = [
  { name: "Math A", value: 30, color: "#3b82f6" },
  { name: "Math B", value: 28, color: "#10b981" },
  { name: "Science", value: 25, color: "#8b5cf6" },
];

const activityData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 4 },
];

// Detailed class information
const myClasses = [
  {
    id: 1,
    name: "Mathematics - Section A",
    code: "MATH-301-A",
    subject: "Advanced Mathematics",
    room: "Room 205, Building A",
    schedule: "Mon, Wed, Fri - 9:00 AM - 10:30 AM",
    totalStudents: 30,
    avgAttendance: 95,
    avgScore: 85,
    materials: [
      { name: "Calculus Textbook Chapter 5", type: "PDF" },
      { name: "Practice Problems Set 3", type: "PDF" },
      { name: "Lecture Notes - Week 8", type: "PDF" },
    ],
    topStudents: [
      { name: "Alex Brown", score: 95 },
      { name: "Sarah Johnson", score: 92 },
      { name: "Emma Davis", score: 88 },
    ],
  },
  {
    id: 2,
    name: "Mathematics - Section B",
    code: "MATH-301-B",
    subject: "Advanced Mathematics",
    room: "Room 207, Building A",
    schedule: "Tue, Thu - 11:00 AM - 12:30 PM",
    totalStudents: 28,
    avgAttendance: 92,
    avgScore: 82,
    materials: [
      { name: "Calculus Textbook Chapter 5", type: "PDF" },
      { name: "Mid-term Exam Questions", type: "PDF" },
    ],
    topStudents: [
      { name: "John Smith", score: 90 },
      { name: "Lisa Martinez", score: 87 },
      { name: "David Lee", score: 85 },
    ],
  },
  {
    id: 3,
    name: "Physics - General Science",
    code: "PHY-201",
    subject: "Quantum Mechanics",
    room: "Lab 103, Science Block",
    schedule: "Mon, Wed - 2:00 PM - 4:00 PM",
    totalStudents: 25,
    avgAttendance: 88,
    avgScore: 78,
    materials: [
      { name: "Quantum Theory Introduction", type: "PDF" },
      { name: "Lab Manual", type: "PDF" },
      { name: "Video Lecture Series", type: "Video" },
    ],
    topStudents: [
      { name: "Mike Wilson", score: 89 },
      { name: "Jessica Taylor", score: 85 },
      { name: "Alex Brown", score: 82 },
    ],
  },
];

// Helper functions
const getAttendanceColor = (attendance) => {
  if (attendance >= 90) return "text-green-600";
  if (attendance >= 75) return "text-orange-600";
  return "text-red-600";
};

const getScoreColor = (score) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  return "text-orange-600";
};

export default function TeacherClasses() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Classes</h1>
        <p className="text-gray-600">Overview of your classes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Classes"
          value="3"
          change="+1"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Total Students"
          value="83"
          change="+5"
          icon={Users}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Weekly Hours"
          value="22"
          change="+2"
          icon={Clock}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Class Distribution
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={classData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {classData.map((entry, index) => (
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

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Teaching Hours
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#hoursGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NEW SECTION: Class Cards with Details */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Class Details</h2>
        <p className="text-gray-600">Detailed information for each class you teach</p>
      </div>

      <div className="space-y-6">
        {myClasses.map((classInfo) => (
          <div
            key={classInfo.id}
            className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow"
          >
            {/* Class Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {classInfo.name}
                </h3>
                <p className="text-sm text-gray-500 font-mono mb-2">
                  {classInfo.code}
                </p>
                <p className="text-gray-600">{classInfo.subject}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Roster
              </button>
            </div>

            {/* Class Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Students */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">Total Students</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {classInfo.totalStudents}
                </p>
              </div>

              {/* Average Attendance */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Avg Attendance</span>
                </div>
                <p className={`text-2xl font-bold ${getAttendanceColor(classInfo.avgAttendance)}`}>
                  {classInfo.avgAttendance}%
                </p>
              </div>

              {/* Average Score */}
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Avg Score</span>
                </div>
                <p className={`text-2xl font-bold ${getScoreColor(classInfo.avgScore)}`}>
                  {classInfo.avgScore}%
                </p>
              </div>

              {/* Location & Schedule */}
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-600">Location</span>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {classInfo.room}
                </p>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Class Schedule</span>
              </div>
              <p className="text-gray-600">{classInfo.schedule}</p>
            </div>

            {/* Top Students */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Top Performers
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {classInfo.topStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {student.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {student.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Materials */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-gray-600" />
                <h4 className="font-semibold text-gray-700">
                  Course Materials ({classInfo.materials.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {classInfo.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {material.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({material.type})
                      </span>
                    </div>
                    <button className="p-1 hover:bg-blue-50 rounded transition-colors">
                      <Download className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}