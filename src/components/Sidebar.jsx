// "use client";

// import { useAuth } from "../App";
// import { useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   BookOpen,
//   Calendar,
//   Settings,
//   LogOut,
//   School,
//   ClipboardList,
//   BarChart3,
//   FileText,
//   Award,
// } from "lucide-react";

// const menuItems = {
//   admin: [
//     { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
//     { icon: Users, label: "Teachers", path: "/dashboard/teachers" },
//     { icon: GraduationCap, label: "Students", path: "/dashboard/students" },
//     { icon: School, label: "Classes", path: "/dashboard/classes" },
//     { icon: BookOpen, label: "Courses", path: "/dashboard/courses" },
//     { icon: Calendar, label: "Schedule", path: "/dashboard/schedule" },
//     { icon: BarChart3, label: "Reports", path: "/dashboard/reports" },
//     { icon: Settings, label: "Settings", path: "/dashboard/settings" },
//   ],
//   teacher: [
//     { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
//     { icon: GraduationCap, label: "Students", path: "/dashboard/students" },
//     { icon: BookOpen, label: "Classes", path: "/dashboard/classes" },
//     {
//       icon: ClipboardList,
//       label: "Assignments",
//       path: "/dashboard/assignments",
//     },
//     { icon: FileText, label: "Grade Book", path: "/dashboard/gradebook" },
//     { icon: Calendar, label: "Schedule", path: "/dashboard/schedule" },
//     { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
//   ],
//   student: [
//     { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
//     { icon: BookOpen, label: "Courses", path: "/dashboard/courses" },
//     {
//       icon: ClipboardList,
//       label: "Assignments",
//       path: "/dashboard/assignments",
//     },
//     { icon: Award, label: "Grades", path: "/dashboard/grades" },
//     { icon: FileText, label: "Report Card", path: "/dashboard/reportcard" },
//     { icon: Calendar, label: "Schedule", path: "/dashboard/schedule" },
//   ],
// };

// const roleColors = {
//   admin: "from-blue-500 to-blue-600",
//   teacher: "from-indigo-500 to-indigo-600",
//   student: "from-cyan-500 to-cyan-600",
// };

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   if (!user) return null;

//   const items = menuItems[user];

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-16 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center py-6 shadow-lg rounded-l-xl z-50">
//       {/* Logo */}
//       <div className="mb-8">
//         <div
//           className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColors[user]} flex items-center justify-center shadow-md`}
//         >
//           <span className="text-white font-bold text-base">AI</span>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 flex flex-col items-center gap-2 w-full px-3">
//         {items.map((item, index) => {
//           const Icon = item.icon;
//           const isActive = window.location.pathname === item.path;

//           return (
//             <button
//               key={item.label}
//               title={item.label}
//               onClick={() => navigate(item.path)}
//               className={`w-full h-11 flex items-center justify-center rounded-xl transition-all group relative ${
//                 isActive
//                   ? "bg-white/10 text-white"
//                   : "text-gray-400 hover:bg-white/5 hover:text-white"
//               }`}
//             >
//               <Icon className="w-5 h-5" />

//               {/* Tooltip */}
//               <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
//                 {item.label}
//               </div>
//             </button>
//           );
//         })}
//       </nav>

//       {/* User Avatar & Logout */}
//       <div className="mt-auto flex flex-col items-center gap-3">
//         {/* User Avatar */}
//         <div className="relative group">
//           <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:bg-white/20 transition-all">
//             {user.charAt(0).toUpperCase()}
//           </button>
//           {/* Tooltip */}
//           <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] bottom-0 shadow-lg">
//             {user.charAt(0).toUpperCase() + user.slice(1)}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           title="Logout"
//           className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all group relative"
//         >
//           <LogOut className="w-5 h-5" />

//           {/* Tooltip */}
//           <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
//             Logout
//           </div>
//         </button>
//       </div>
//     </aside>
//   );
// }
"use client";

import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  School,
  ClipboardList,
  BarChart3,
  FileText,
  Award,
} from "lucide-react";

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Teachers", path: "/dashboard/teachers" },
    { icon: GraduationCap, label: "Students", path: "/dashboard/students" },
    { icon: School, label: "Classes", path: "/dashboard/classes" },
    { icon: BookOpen, label: "Courses", path: "/dashboard/courses" },
    { icon: Calendar, label: "Schedule", path: "/dashboard/schedule" },
    { icon: BarChart3, label: "Reports", path: "/dashboard/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: GraduationCap, label: "Students", path: "/dashboard/students" },
    { icon: BookOpen, label: "Classes", path: "/dashboard/classes" },
    {
      icon: ClipboardList,
      label: "Assignments",
      path: "/dashboard/assignments",
    },
    { icon: FileText, label: "Grade Book", path: "/dashboard/gradebook" },
    { icon: Calendar, label: "Schedule", path: "/dashboard/schedule" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  ],
  student: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "Courses", path: "/dashboard/courses" },
    {
      icon: ClipboardList,
      label: "Assignments",
      path: "/dashboard/assignments",
    },
    { icon: Award, label: "Grades", path: "/dashboard/grades" },
    { icon: FileText, label: "Report Card", path: "/dashboard/reportcard" },
    { icon: Calendar, label: "Schedule", path: "/dashboard/schedule" },
  ],
};

const roleColors = {
  admin: "from-blue-500 to-blue-600",
  teacher: "from-indigo-500 to-indigo-600",
  student: "from-cyan-500 to-cyan-600",
};

const roleHoverGradients = {
  admin:
    "hover:bg-gradient-to-br hover:from-violet-500/30 hover:via-fuchsia-500/30 hover:to-pink-500/30",
  teacher:
    "hover:bg-gradient-to-br hover:from-blue-500/30 hover:via-cyan-500/30 hover:to-teal-500/30",
  student:
    "hover:bg-gradient-to-br hover:from-emerald-500/30 hover:via-lime-500/30 hover:to-yellow-500/30",
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const items = menuItems[user];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center py-6 shadow-lg rounded-l-xl z-50">
      {/* Logo */}
      <div className="mb-8">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColors[user]} flex items-center justify-center shadow-md hover:shadow-2xl hover:shadow-violet-500/50 hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-gradient-to-br hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500`}
        >
          <span className="text-white font-bold text-base">AI</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col items-center gap-2 w-full px-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = window.location.pathname === item.path;

          return (
            <button
              key={item.label}
              title={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full h-11 flex items-center justify-center rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? `bg-gradient-to-br from-violet-500/35 via-fuchsia-500/35 to-pink-500/35 text-white shadow-lg shadow-fuchsia-500/30 backdrop-blur-lg border border-fuchsia-400/40`
                  : `text-gray-400 ${roleHoverGradients[user]} hover:text-white hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 hover:backdrop-blur-lg hover:border hover:border-white/20`
              }`}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:drop-shadow-lg" />

              {/* Tooltip - Tag Design */}
              <div className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[9999]">
                <div className="relative">
                  {/* Tag Triangle */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-800"></div>
                  {/* Tag Content */}
                  <div className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-xl border border-gray-700">
                    {item.label}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Avatar & Logout */}
      <div className="mt-auto flex flex-col items-center gap-3">
        {/* User Avatar */}
        <div className="relative group">
          <button
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${roleColors[user]}/20 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-fuchsia-500/50 transition-all duration-300 hover:scale-110 border border-white/10 hover:border-fuchsia-400/50 hover:bg-gradient-to-br hover:from-violet-500/40 hover:via-fuchsia-500/40 hover:to-pink-500/40 hover:backdrop-blur-lg`}
          >
            {user.charAt(0).toUpperCase()}
          </button>
          {/* Tooltip - Tag Design */}
          <div className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[9999] bottom-0">
            <div className="relative">
              {/* Tag Triangle */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-800"></div>
              {/* Tag Content */}
              <div className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-xl border border-gray-700">
                {user.charAt(0).toUpperCase() + user.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gradient-to-br hover:from-rose-500/30 hover:via-orange-500/30 hover:to-amber-500/30 hover:text-rose-400 transition-all duration-300 group relative hover:shadow-lg hover:shadow-rose-500/30 hover:scale-105 hover:backdrop-blur-lg hover:border hover:border-rose-400/30"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:drop-shadow-lg" />

          {/* Tooltip - Tag Design */}
          <div className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[9999]">
            <div className="relative">
              {/* Tag Triangle */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-800"></div>
              {/* Tag Content */}
              <div className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-xl border border-gray-700">
                Logout
              </div>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
