import { TrendingUp, TrendingDown } from "lucide-react";

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  indigo: "from-indigo-500 to-indigo-600",
  cyan: "from-cyan-500 to-cyan-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  pink: "from-pink-500 to-pink-600",
};

export default function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-sm`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {trend === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
        {trend === "down" && <TrendingDown className="w-4 h-4 text-red-600" />}
        <span
          className={`text-sm font-medium ${
            trend === "up"
              ? "text-green-600"
              : trend === "down"
                ? "text-red-600"
                : "text-gray-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
