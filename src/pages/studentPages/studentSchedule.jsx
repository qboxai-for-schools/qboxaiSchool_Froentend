import { Calendar, Clock, BookOpen, MapPin, User } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyClasses = [
  { day: "Mon", classes: 6 },
  { day: "Tue", classes: 7 },
  { day: "Wed", classes: 5 },
  { day: "Thu", classes: 6 },
  { day: "Fri", classes: 5 },
];

const studyHours = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 3 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 4 },
];

// Weekly timetable data
const weeklyTimetable = {
  Monday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Advanced Mathematics",
      teacher: "Dr. Sarah Johnson",
      room: "Room 205, Building A",
      type: "Lecture",
    },
    {
      time: "11:00 AM - 12:30 PM",
      subject: "Organic Chemistry",
      teacher: "Dr. Emily Rodriguez",
      room: "Room 310, Science Block",
      type: "Lab",
    },
    {
      time: "2:00 PM - 3:30 PM",
      subject: "Physics - Mechanics",
      teacher: "Prof. Michael Chen",
      room: "Lab 103, Science Block",
      type: "Lecture",
    },
  ],
  Tuesday: [
    {
      time: "10:00 AM - 11:30 AM",
      subject: "English Literature",
      teacher: "Mrs. Patricia Williams",
      room: "Room 102, Arts Building",
      type: "Lecture",
    },
    {
      time: "2:00 PM - 4:00 PM",
      subject: "Physics - Quantum Lab",
      teacher: "Prof. Michael Chen",
      room: "Lab 103, Science Block",
      type: "Lab",
    },
  ],
  Wednesday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Advanced Mathematics",
      teacher: "Dr. Sarah Johnson",
      room: "Room 205, Building A",
      type: "Lecture",
    },
    {
      time: "11:00 AM - 12:30 PM",
      subject: "Organic Chemistry",
      teacher: "Dr. Emily Rodriguez",
      room: "Room 310, Science Block",
      type: "Lecture",
    },
  ],
  Thursday: [
    {
      time: "10:00 AM - 11:30 AM",
      subject: "English Literature",
      teacher: "Mrs. Patricia Williams",
      room: "Room 102, Arts Building",
      type: "Lecture",
    },
    {
      time: "2:00 PM - 4:00 PM",
      subject: "Physics - Quantum Lab",
      teacher: "Prof. Michael Chen",
      room: "Lab 103, Science Block",
      type: "Lab",
    },
  ],
  Friday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Advanced Mathematics",
      teacher: "Dr. Sarah Johnson",
      room: "Room 205, Building A",
      type: "Lecture",
    },
    {
      time: "1:00 PM - 3:00 PM",
      subject: "World History",
      teacher: "Dr. Robert Anderson",
      room: "Room 205, Arts Building",
      type: "Lecture",
    },
  ],
};

// Get current day for highlighting
const getCurrentDay = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  return days[today];
};

// Helper function to get class type color
const getClassTypeColor = (type) => {
  if (type === "Lab") return "bg-purple-100 text-purple-700";
  return "bg-blue-100 text-blue-700";
};

export default function StudentSchedule() {
  const currentDay = getCurrentDay();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Class Schedule</h1>
        <p className="text-gray-600">Overview of your weekly classes and study time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Weekly Classes"
          value="29"
          change="+2"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Weekly Study Hours"
          value="27"
          change="+3"
          icon={Clock}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Free Periods"
          value="6"
          change="-1"
          icon={Calendar}
          trend="down"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Classes
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyClasses}>
              <defs>
                <linearGradient id="classBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
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
              <Bar
                dataKey="classes"
                fill="url(#classBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Study Hours
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={studyHours}>
              <defs>
                <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.1} />
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
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#studyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NEW SECTION: Weekly Timetable */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Timetable</h2>
        <p className="text-gray-600">Your complete schedule with timings and locations</p>
      </div>

      <div className="space-y-6">
        {Object.entries(weeklyTimetable).map(([day, classes]) => (
          <div
            key={day}
            className={`glass-card rounded-2xl p-6 ${
              day === currentDay ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
          >
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    day === currentDay ? "bg-blue-500" : "bg-gray-200"
                  }`}
                >
                  <Calendar
                    className={`w-5 h-5 ${
                      day === currentDay ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{day}</h3>
                {day === currentDay && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    Today
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {classes.length} {classes.length === 1 ? "class" : "classes"}
              </span>
            </div>

            {/* Classes for the day */}
            <div className="space-y-3">
              {classes.map((classItem, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {classItem.subject}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getClassTypeColor(
                            classItem.type
                          )}`}
                        >
                          {classItem.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {classItem.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Teacher */}
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Instructor</p>
                        <p className="text-sm font-medium text-gray-800">
                          {classItem.teacher}
                        </p>
                      </div>
                    </div>

                    {/* Room */}
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-800">
                          {classItem.room}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}