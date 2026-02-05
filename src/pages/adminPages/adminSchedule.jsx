import { Calendar, Clock, Users, BookOpen } from "lucide-react";
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
  { day: "Mon", classes: 8, labs: 3 },
  { day: "Tue", classes: 7, labs: 4 },
  { day: "Wed", classes: 9, labs: 2 },
  { day: "Thu", classes: 6, labs: 5 },
  { day: "Fri", classes: 8, labs: 3 },
];

const utilizationData = [
  { time: "8AM", utilization: 75 },
  { time: "9AM", utilization: 85 },
  { time: "10AM", utilization: 92 },
  { time: "11AM", utilization: 88 },
  { time: "12PM", utilization: 45 },
  { time: "1PM", utilization: 70 },
  { time: "2PM", utilization: 95 },
  { time: "3PM", utilization: 82 },
  { time: "4PM", utilization: 60 },
];

export default function Schedule() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Schedule Management
        </h1>
        <p className="text-gray-600">
          Manage class schedules and room utilization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Today's Classes"
          value="28"
          change="+2"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Rooms"
          value="18"
          change="+1"
          icon={Users}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Peak Hours"
          value="2-4PM"
          change="95%"
          icon={Clock}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Utilization"
          value="78%"
          change="+5%"
          icon={Calendar}
          trend="up"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Schedule
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySchedule}>
              <defs>
                <linearGradient id="classesBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="labsBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
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
                fill="url(#classesBar)"
                radius={[8, 8, 0, 0]}
              />
              <Bar dataKey="labs" fill="url(#labsBar)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Room Utilization
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationData}>
              <defs>
                <linearGradient
                  id="utilizationLine"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" />
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
                dataKey="utilization"
                stroke="url(#utilizationLine)"
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
