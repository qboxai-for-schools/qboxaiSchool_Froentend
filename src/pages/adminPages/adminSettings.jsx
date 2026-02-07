import { useState } from "react";
import {
  Settings as SettingsIcon,
  School,
  User,
  Bell,
  Shield,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  Camera,
  Lock,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("school");

  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: "Sunshine International School",
    address: "123 Education Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 234-567-8900",
    email: "info@sunshineintl.edu",
    website: "www.sunshineintl.edu",
    establishedYear: "1995",
    accreditation: "Regional Board of Education",
  });

  const [adminProfile, setAdminProfile] = useState({
    fullName: "Dr. Sarah Anderson",
    email: "sarah.anderson@sunshineintl.edu",
    phone: "+1 234-567-8901",
    role: "Principal",
    employeeId: "ADM-001",
    joinDate: "2015-08-01",
  });

  const [systemSettings, setSystemSettings] = useState({
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    language: "English",
    academicYearStart: "September",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    studentAdmissions: true,
    teacherUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
  });

  const handleSchoolInfoChange = (e) => {
    setSchoolInfo({
      ...schoolInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminProfileChange = (e) => {
    setAdminProfile({
      ...adminProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSystemSettingsChange = (e) => {
    setSystemSettings({
      ...systemSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSecurityChange = (e) => {
    if (e.target.type === "checkbox") {
      setSecurity({
        ...security,
        [e.target.name]: e.target.checked,
      });
    } else {
      setSecurity({
        ...security,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    console.log("Saving settings...", {
      schoolInfo,
      adminProfile,
      systemSettings,
      notifications,
      security,
    });
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage school information, admin profile, and system preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("school")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === "school"
              ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
              : "bg-white/40 text-gray-700 hover:bg-white/60 border border-gray-200/50"
          }`}
        >
          <School className="w-5 h-5" />
          School Information
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === "admin"
              ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
              : "bg-white/40 text-gray-700 hover:bg-white/60 border border-gray-200/50"
          }`}
        >
          <User className="w-5 h-5" />
          Admin Profile
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === "system"
              ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
              : "bg-white/40 text-gray-700 hover:bg-white/60 border border-gray-200/50"
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          System Settings
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === "notifications"
              ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
              : "bg-white/40 text-gray-700 hover:bg-white/60 border border-gray-200/50"
          }`}
        >
          <Bell className="w-5 h-5" />
          Notifications
        </button>
        {/* <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === "security"
              ? "bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30"
              : "bg-white/40 text-gray-700 hover:bg-white/60 border border-gray-200/50"
          }`}
        >
          <Shield className="w-5 h-5" />
          Security
        </button> */}
      </div>

      {/* Tab Content */}
      <div className="glass-card rounded-2xl p-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        {/* School Information Tab */}
        {activeTab === "school" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  School Information
                </h2>
                <p className="text-gray-600 text-sm">
                  Manage your school's basic information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={schoolInfo.schoolName}
                  onChange={handleSchoolInfoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="establishedYear"
                    value={schoolInfo.establishedYear}
                    onChange={handleSchoolInfoChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={schoolInfo.address}
                    onChange={handleSchoolInfoChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={schoolInfo.city}
                  onChange={handleSchoolInfoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={schoolInfo.state}
                  onChange={handleSchoolInfoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={schoolInfo.zipCode}
                  onChange={handleSchoolInfoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={schoolInfo.country}
                  onChange={handleSchoolInfoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={schoolInfo.phone}
                    onChange={handleSchoolInfoChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={schoolInfo.email}
                    onChange={handleSchoolInfoChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="website"
                    value={schoolInfo.website}
                    onChange={handleSchoolInfoChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accreditation
                </label>
                <input
                  type="text"
                  name="accreditation"
                  value={schoolInfo.accreditation}
                  onChange={handleSchoolInfoChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Admin Profile Tab */}
        {activeTab === "admin" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Admin Profile
                </h2>
                <p className="text-gray-600 text-sm">
                  Manage your personal information
                </p>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-8 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  SA
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4 text-gray-700" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Profile Picture
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Upload a new profile picture
                </p>
                <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={adminProfile.fullName}
                  onChange={handleAdminProfileChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role/Position
                </label>
                <input
                  type="text"
                  name="role"
                  value={adminProfile.role}
                  onChange={handleAdminProfileChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={adminProfile.email}
                    onChange={handleAdminProfileChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={adminProfile.phone}
                    onChange={handleAdminProfileChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={adminProfile.employeeId}
                  onChange={handleAdminProfileChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="joinDate"
                    value={adminProfile.joinDate}
                    onChange={handleAdminProfileChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Change Password
                </h3>
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300">
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === "system" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  System Settings
                </h2>
                <p className="text-gray-600 text-sm">
                  Configure system preferences
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={systemSettings.timezone}
                  onChange={handleSystemSettingsChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={systemSettings.dateFormat}
                  onChange={handleSystemSettingsChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="currency"
                    value={systemSettings.currency}
                    onChange={handleSystemSettingsChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="INR">INR - Indian Rupee</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={systemSettings.language}
                  onChange={handleSystemSettingsChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year Start
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="academicYearStart"
                    value={systemSettings.academicYearStart}
                    onChange={handleSystemSettingsChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Notification Preferences
                </h2>
                <p className="text-gray-600 text-sm">
                  Manage how you receive notifications
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              {/* SMS Notifications */}
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      SMS Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications via text message
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={notifications.smsNotifications}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              {/* Student Admissions */}
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Student Admissions
                    </h3>
                    <p className="text-sm text-gray-600">
                      Notify about new student admissions
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="studentAdmissions"
                    checked={notifications.studentAdmissions}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              {/* Teacher Updates */}
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Teacher Updates
                    </h3>
                    <p className="text-sm text-gray-600">
                      Notify about teacher-related updates
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="teacherUpdates"
                    checked={notifications.teacherUpdates}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              {/* System Alerts */}
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      System Alerts
                    </h3>
                    <p className="text-sm text-gray-600">
                      Important system and security alerts
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="systemAlerts"
                    checked={notifications.systemAlerts}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>

              {/* Weekly Reports */}
              <div className="p-4 rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Weekly Reports
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive weekly summary reports
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="weeklyReports"
                    checked={notifications.weeklyReports}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-500"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Security Settings
                </h2>
                <p className="text-gray-600 text-sm">
                  Manage your account security
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Two-Factor Authentication */}
              <div className="p-6 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-red-500" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={security.twoFactorAuth}
                      onChange={handleSecurityChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-rose-500"></div>
                  </label>
                </div>
                {security.twoFactorAuth && (
                  <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Two-factor authentication is enabled
                    </p>
                  </div>
                )}
              </div>

              {/* Session Timeout */}
              <div className="p-6 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Session Timeout
                    </h3>
                    <p className="text-sm text-gray-600">
                      Automatically log out after inactivity
                    </p>
                  </div>
                </div>
                <select
                  name="sessionTimeout"
                  value={security.sessionTimeout}
                  onChange={handleSecurityChange}
                  className="w-full max-w-xs px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              {/* Password Expiry */}
              <div className="p-6 rounded-xl bg-white/50 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Password Expiry
                    </h3>
                    <p className="text-sm text-gray-600">
                      Require password change after specified days
                    </p>
                  </div>
                </div>
                <select
                  name="passwordExpiry"
                  value={security.passwordExpiry}
                  onChange={handleSecurityChange}
                  className="w-full max-w-xs px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all backdrop-blur-sm appearance-none"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="never">Never</option>
                </select>
              </div>

              {/* Activity Log */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Activity Log</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  View recent login activity and security events
                </p>
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300">
                  View Activity Log
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-3">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
