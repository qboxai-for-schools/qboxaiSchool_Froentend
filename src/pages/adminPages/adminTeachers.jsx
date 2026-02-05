import { Users, TrendingUp, Award, Calendar } from "lucide-react";
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

const performanceData = [
  { name: "John Smith", rating: 4.8, classes: 12 },
  { name: "Sarah Johnson", rating: 4.9, classes: 15 },
  { name: "Mike Davis", rating: 4.7, classes: 10 },
  { name: "Emily Brown", rating: 4.6, classes: 13 },
  { name: "David Wilson", rating: 4.9, classes: 14 },
  { name: "Lisa Anderson", rating: 4.8, classes: 11 },
];

const attendanceData = [
  { month: "Jan", present: 95 },
  { month: "Feb", present: 93 },
  { month: "Mar", present: 96 },
  { month: "Apr", present: 94 },
  { month: "May", present: 97 },
  { month: "Jun", present: 95 },
];

export default function Teachers() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Teachers Management
        </h1>
        <p className="text-gray-600">Manage and monitor teacher performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Teachers"
          value="48"
          change="+3"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Today"
          value="45"
          change="+2"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Rating"
          value="4.8"
          change="+0.2"
          icon={Award}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="On Leave"
          value="3"
          change="-1"
          icon={Calendar}
          trend="down"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Teacher Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <defs>
                <linearGradient id="teacherBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="rating"
                fill="url(#teacherBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Attendance Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <defs>
                <linearGradient id="attendanceLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis domain={[90, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="present"
                stroke="url(#attendanceLine)"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
