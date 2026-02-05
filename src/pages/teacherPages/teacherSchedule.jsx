import { Calendar, Clock, BookOpen } from "lucide-react";
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

export default function TeacherSchedule() {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
}
