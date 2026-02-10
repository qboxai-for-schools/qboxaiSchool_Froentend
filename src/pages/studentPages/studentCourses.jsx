import { BookOpen, Clock, Award, User, MapPin, Download, FileText } from "lucide-react";
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

const enrolledCourses = [
  { name: "Mathematics", progress: 75 },
  { name: "Physics", progress: 82 },
  { name: "Chemistry", progress: 68 },
  { name: "English", progress: 90 },
  { name: "History", progress: 85 },
];

const courseStatus = [
  { name: "Completed", value: 8, color: "#10b981" },
  { name: "In Progress", value: 5, color: "#3b82f6" },
  { name: "Not Started", value: 2, color: "#f59e0b" },
];

// Detailed course information
const courseDetails = [
  {
    id: 1,
    name: "Advanced Mathematics",
    code: "MATH-301",
    teacher: "Dr. Sarah Johnson",
    room: "Room 205, Building A",
    schedule: "Mon, Wed, Fri - 9:00 AM - 10:30 AM",
    progress: 75,
    status: "In Progress",
    materials: [
      { name: "Calculus Textbook Chapter 5", type: "PDF" },
      { name: "Practice Problems Set 3", type: "PDF" },
      { name: "Lecture Notes - Week 8", type: "PDF" },
    ],
  },
  {
    id: 2,
    name: "Physics - Quantum Mechanics",
    code: "PHY-201",
    teacher: "Prof. Michael Chen",
    room: "Lab 103, Science Block",
    schedule: "Tue, Thu - 2:00 PM - 4:00 PM",
    progress: 82,
    status: "In Progress",
    materials: [
      { name: "Quantum Theory Introduction", type: "PDF" },
      { name: "Lab Manual", type: "PDF" },
      { name: "Video Lecture Series", type: "Video" },
    ],
  },
  {
    id: 3,
    name: "Organic Chemistry",
    code: "CHEM-202",
    teacher: "Dr. Emily Rodriguez",
    room: "Room 310, Science Block",
    schedule: "Mon, Wed - 11:00 AM - 12:30 PM",
    progress: 68,
    status: "In Progress",
    materials: [
      { name: "Reaction Mechanisms Guide", type: "PDF" },
      { name: "Lab Safety Protocols", type: "PDF" },
    ],
  },
  {
    id: 4,
    name: "English Literature",
    code: "ENG-101",
    teacher: "Mrs. Patricia Williams",
    room: "Room 102, Arts Building",
    schedule: "Tue, Thu - 10:00 AM - 11:30 AM",
    progress: 90,
    status: "In Progress",
    materials: [
      { name: "Shakespeare Complete Works", type: "PDF" },
      { name: "Literary Analysis Essay Guidelines", type: "PDF" },
      { name: "Reading List - Semester 2", type: "PDF" },
    ],
  },
  {
    id: 5,
    name: "World History",
    code: "HIST-150",
    teacher: "Dr. Robert Anderson",
    room: "Room 205, Arts Building",
    schedule: "Fri - 1:00 PM - 3:00 PM",
    progress: 85,
    status: "In Progress",
    materials: [
      { name: "WWI & WWII Timeline", type: "PDF" },
      { name: "Research Paper Template", type: "PDF" },
    ],
  },
];

// Helper function to get progress color
const getProgressColor = (progress) => {
  if (progress >= 80) return "bg-green-500";
  if (progress >= 60) return "bg-blue-500";
  if (progress >= 40) return "bg-orange-500";
  return "bg-red-500";
};

// Helper function to get status badge color
const getStatusColor = (status) => {
  if (status === "Completed") return "bg-green-100 text-green-700";
  if (status === "In Progress") return "bg-blue-100 text-blue-700";
  return "bg-orange-100 text-orange-700";
};

export default function StudentCourses() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Overview</h1>
        <p className="text-gray-600">Track progress across your enrolled subjects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Courses"
          value="15"
          change="+2"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="In Progress"
          value="5"
          change="+1"
          icon={Clock}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Completed"
          value="8"
          change="+3"
          icon={Award}
          trend="up"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Course Progress
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={enrolledCourses}>
              <defs>
                <linearGradient id="progressBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="progress"
                fill="url(#progressBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Course Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={courseStatus}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {courseStatus.map((entry, index) => (
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

      {/* NEW SECTION: Detailed Course Cards */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My Courses</h2>
        <p className="text-gray-600">View details, schedules, and materials for each course</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courseDetails.map((course) => (
          <div
            key={course.id}
            className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow"
          >
            {/* Course Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 font-mono">{course.code}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  course.status
                )}`}
              >
                {course.status}
              </span>
            </div>

            {/* Teacher & Location Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Instructor</p>
                  <p className="font-semibold text-gray-800">{course.teacher}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium text-gray-700">{course.room}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Schedule</p>
                  <p className="font-medium text-gray-700">{course.schedule}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Progress
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getProgressColor(
                    course.progress
                  )}`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Course Materials */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-gray-600" />
                <h4 className="font-semibold text-gray-700 text-sm">
                  Course Materials ({course.materials.length})
                </h4>
              </div>
              <div className="space-y-2">
                {course.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {material.name}
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