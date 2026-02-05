import { Settings as SettingsIcon, Users, Bell, Shield } from "lucide-react";
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

const activityData = [
  { day: "Mon", logins: 45, changes: 12 },
  { day: "Tue", logins: 52, changes: 18 },
  { day: "Wed", logins: 48, changes: 15 },
  { day: "Thu", logins: 55, changes: 20 },
  { day: "Fri", logins: 50, changes: 16 },
  { day: "Sat", logins: 25, changes: 8 },
  { day: "Sun", logins: 20, changes: 5 },
];

const systemHealth = [
  { metric: "CPU", value: 45 },
  { metric: "Memory", value: 68 },
  { metric: "Storage", value: 52 },
  { metric: "Network", value: 75 },
  { metric: "Database", value: 60 },
];

export default function Settings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          System Settings
        </h1>
        <p className="text-gray-600">
          Manage system preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Users"
          value="142"
          change="+12"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Notifications"
          value="28"
          change="+5"
          icon={Bell}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Security Score"
          value="95%"
          change="+2%"
          icon={Shield}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="System Health"
          value="98%"
          change="+1%"
          icon={SettingsIcon}
          trend="up"
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Activity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <defs>
                <linearGradient id="loginLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="changesLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#db2777" stopOpacity={0.6} />
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
              <Line
                type="monotone"
                dataKey="logins"
                stroke="url(#loginLine)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="changes"
                stroke="url(#changesLine)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            System Resources
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={systemHealth}>
              <defs>
                <linearGradient id="healthBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="value"
                fill="url(#healthBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
