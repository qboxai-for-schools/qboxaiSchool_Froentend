import { BookOpen, Users, TrendingUp, Award } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const enrollmentData = [
  { month: "Jan", math: 120, science: 110, english: 130, history: 95 },
  { month: "Feb", math: 125, science: 115, english: 135, history: 100 },
  { month: "Mar", math: 130, science: 120, english: 138, history: 105 },
  { month: "Apr", math: 135, science: 125, english: 142, history: 108 },
  { month: "May", math: 142, science: 128, english: 145, history: 112 },
  { month: "Jun", math: 148, science: 132, english: 150, history: 115 },
];

const completionData = [
  { course: "Mathematics", completion: 85 },
  { course: "Science", completion: 78 },
  { course: "English", completion: 92 },
  { course: "History", completion: 88 },
  { course: "Computer Sci", completion: 81 },
  { course: "Arts", completion: 95 },
];

export default function Courses() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Courses Management
        </h1>
        <p className="text-gray-600">
          Manage courses and track completion rates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Courses"
          value="42"
          change="+5"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Courses"
          value="38"
          change="+3"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Total Enrollments"
          value="2,456"
          change="+156"
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Completion Rate"
          value="86%"
          change="+5%"
          icon={Award}
          trend="up"
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Course Enrollments
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <defs>
                <linearGradient id="mathLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="scienceLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="englishLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="historyLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="math"
                stroke="url(#mathLine)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="science"
                stroke="url(#scienceLine)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="english"
                stroke="url(#englishLine)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="history"
                stroke="url(#historyLine)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Completion Rates
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionData} layout="vertical">
              <defs>
                <linearGradient
                  id="completionGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="course" type="category" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="completion"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#completionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
