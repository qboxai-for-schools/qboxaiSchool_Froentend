"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../App";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "../components/dashboards/AdminDashboard";
import TeacherDashboard from "../components/dashboards/TeacherDashboard";
import StudentDashboard from "../components/dashboards/StudentDashboard";
import Teachers from "./adminPages/adminTeachers";
import Students from "./adminPages/adminStudents";
import Classes from "./adminPages/adminClasses";
import Courses from "./adminPages/adminCourses";
import Schedule from "./adminPages/adminSchedule";
import Reports from "./adminPages/adminReports";
import Settings from "./adminPages/adminSettings";
import TeacherStudents from "./teacherPages/teacherStudents";
import TeacherClasses from "./teacherPages/teacherClasses";
import TeacherAssignments from "./teacherPages/teacherAssignments";
import TeacherGradeBook from "./teacherPages/teacherGradeBook";
import TeacherSchedule from "./teacherPages/teacherSchedule";
import TeacherAnalytics from "./teacherPages/teacherAnalytics";
import StudentCourses from "./studentPages/studentCourses";
import StudentAssignments from "./studentPages/studentAssignments";
import StudentGrades from "./studentPages/studentGrades";
import StudentReportCard from "./studentPages/studentReportCard";
import StudentSchedule from "./studentPages/studentSchedule";

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    if (user === "admin") {
      return (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      );
    } else if (user === "teacher") {
      return (
        <Routes>
          <Route path="/" element={<TeacherDashboard />} />
          <Route path="/students" element={<TeacherStudents />} />
          <Route path="/classes" element={<TeacherClasses />} />
          <Route path="/assignments" element={<TeacherAssignments />} />
          <Route path="/gradebook" element={<TeacherGradeBook />} />
          <Route path="/schedule" element={<TeacherSchedule />} />
          <Route path="/analytics" element={<TeacherAnalytics />} />
        </Routes>
      );
    } else if (user === "student") {
      return (
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/courses" element={<StudentCourses />} />
          <Route path="/assignments" element={<StudentAssignments />} />
          <Route path="/grades" element={<StudentGrades />} />
          <Route path="/reportcard" element={<StudentReportCard />} />
          <Route path="/schedule" element={<StudentSchedule />} />
        </Routes>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-16">{renderDashboard()}</main>
    </div>
  );
}
