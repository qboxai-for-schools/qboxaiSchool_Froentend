import { Calendar, Clock, BookOpen, MapPin, Users } from "lucide-react";
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

const weeklySchedule = [
  { day: "Mon", classes: 4, hours: 4 },
  { day: "Tue", classes: 5, hours: 5 },
  { day: "Wed", classes: 3, hours: 3 },
  { day: "Thu", classes: 6, hours: 6 },
  { day: "Fri", classes: 4, hours: 4 },
];

const timeSlots = [
  { time: "8-9 AM", load: 1 },
  { time: "9-10 AM", load: 2 },
  { time: "10-11 AM", load: 2 },
  { time: "11-12 PM", load: 1 },
  { time: "1-2 PM", load: 2 },
  { time: "2-3 PM", load: 1 },
];

// Weekly timetable data
const weeklyTimetable = {
  Monday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Mathematics - Section A",
      class: "Math A",
      room: "Room 205, Building A",
      students: 30,
    },
    {
      time: "11:00 AM - 12:30 PM",
      subject: "Mathematics - Section B",
      class: "Math B",
      room: "Room 207, Building A",
      students: 28,
    },
    {
      time: "2:00 PM - 3:30 PM",
      subject: "Physics - Quantum Mechanics",
      class: "Science",
      room: "Lab 103, Science Block",
      students: 25,
    },
  ],
  Tuesday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Mathematics - Section A",
      class: "Math A",
      room: "Room 205, Building A",
      students: 30,
    },
    {
      time: "11:00 AM - 12:30 PM",
      subject: "Physics - Quantum Mechanics",
      class: "Science",
      room: "Lab 103, Science Block",
      students: 25,
    },
    {
      time: "2:00 PM - 4:00 PM",
      subject: "Mathematics - Section B",
      class: "Math B",
      room: "Room 207, Building A",
      students: 28,
    },
  ],
  Wednesday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Mathematics - Section A",
      class: "Math A",
      room: "Room 205, Building A",
      students: 30,
    },
    {
      time: "2:00 PM - 3:30 PM",
      subject: "Physics - Quantum Mechanics",
      class: "Science",
      room: "Lab 103, Science Block",
      students: 25,
    },
  ],
  Thursday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Mathematics - Section B",
      class: "Math B",
      room: "Room 207, Building A",
      students: 28,
    },
    {
      time: "11:00 AM - 12:30 PM",
      subject: "Mathematics - Section A",
      class: "Math A",
      room: "Room 205, Building A",
      students: 30,
    },
    {
      time: "2:00 PM - 4:00 PM",
      subject: "Physics - Quantum Mechanics",
      class: "Science",
      room: "Lab 103, Science Block",
      students: 25,
    },
  ],
  Friday: [
    {
      time: "9:00 AM - 10:30 AM",
      subject: "Mathematics - Section A",
      class: "Math A",
      room: "Room 205, Building A",
      students: 30,
    },
    {
      time: "11:00 AM - 12:30 PM",
      subject: "Mathematics - Section B",
      class: "Math B",
      room: "Room 207, Building A",
      students: 28,
    },
  ],
};

// Get current day for highlighting
const getCurrentDay = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  return days[today];
};

export default function TeacherSchedule() {
  const currentDay = getCurrentDay();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Schedule</h1>
        <p className="text-gray-600">View your teaching schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Weekly Classes"
          value="22"
          change="+2"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Teaching Hours"
          value="22"
          change="+2"
          icon={Clock}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Free Periods"
          value="8"
          change="-1"
          icon={Calendar}
          trend="down"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Overview
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklySchedule}>
              <defs>
                <linearGradient id="scheduleBar" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#scheduleBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Daily Time Slots
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeSlots}>
              <defs>
                <linearGradient id="timeLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" angle={-15} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="load"
                stroke="url(#timeLine)"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NEW SECTION: Weekly Timetable */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Timetable</h2>
        <p className="text-gray-600">Your complete teaching schedule with class details</p>
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
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {classItem.subject}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {classItem.time}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                      {classItem.class}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                    {/* Students */}
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Students</p>
                        <p className="text-sm font-medium text-gray-800">
                          {classItem.students} students
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