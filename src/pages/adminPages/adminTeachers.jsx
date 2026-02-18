import { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  Award,
  Calendar,
  Plus,
  Upload,
  X,
  Mail,
  Phone,
  BookOpen,
  Edit,
  Trash2,
  Activity,
  Loader2,
  Power,
  FileDown,
} from "lucide-react";
import api from "../../services/api";
import StatsCard from "../../components/StatsCard";
import { toast, Toaster } from "sonner";

export default function Teachers() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [togglingId, setTogglingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const pageSize = 20;

  // Fetch teachers from API
  const fetchTeachers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/users/list-users`, {
        params: {
          page: page,
          page_size: pageSize,
          role: "teacher",
        },
      });

      setTeachers(response.data.items);
      setTotalTeachers(response.data.total);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Failed to load teachers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  // Toggle teacher active/inactive status
  const handleToggleStatus = async (teacherId, currentStatus) => {
    try {
      setTogglingId(teacherId);
      await api.patch(`/users/${teacherId}`, {
        is_active: !currentStatus,
      });

      // Update the local state
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === teacherId
            ? { ...teacher, is_active: !currentStatus }
            : teacher,
        ),
      );
      toast.success(
        `Teacher ${!currentStatus ? "activated" : "deactivated"} successfully!`,
      );
    } catch (error) {
      console.error("Error toggling teacher status:", error);
      toast.error("Failed to update teacher status. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Teacher:", formData);
    setShowCreateForm(false);
    setFormData({ name: "", email: "", phone: "", subject: "" });
  };

  // Handle bulk upload
  const handleBulkUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const response = await api.post("/bulk/teachers", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 120000, // 2 minutes timeout
        });

        toast.success("Teachers uploaded successfully!");
        fetchTeachers(); // Refresh the list
      } catch (error) {
        console.error("Error uploading file:", error);

        if (error.code === "ECONNABORTED") {
          toast.error(
            "Upload timeout! Please try with a smaller file or check your internet connection.",
          );
        } else {
          toast.error(
            error.response?.data?.message ||
              "Error uploading file. Please check the format and try again.",
          );
        }
      } finally {
        setUploading(false);
      }
    };
    input.click();
  };

  // Download template from assets folder
  const handleDownloadTemplate = () => {
    try {
      const link = document.createElement("a");
      link.href = "/assets/teachers_bulk_upload_template.csv";
      link.download = "teachers_bulk_upload_template.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Template downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download template. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" richColors />
      {/* Header with Buttons */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Teachers Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor teacher performance
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-500/90 via-indigo-500/90 to-purple-500/90 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
            title="Download CSV Template"
          >
            <FileDown className="w-5 h-5" />
            Download Template
          </button>
          <button
            onClick={handleBulkUpload}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500/90 via-teal-500/90 to-cyan-500/90 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Bulk Upload
              </>
            )}
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Plus className="w-5 h-5" />
            Create Teacher
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Teachers"
          value={loading ? "..." : totalTeachers.toString()}
          change="-"
          icon={Users}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Teachers"
          value={
            loading
              ? "..."
              : teachers.filter((t) => t.is_active).length.toString()
          }
          change="-"
          icon={Activity}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Inactive"
          value={
            loading
              ? "..."
              : teachers.filter((t) => !t.is_active).length.toString()
          }
          change="-"
          icon={Calendar}
          trend="down"
          color="purple"
        />
        <StatsCard
          title="Current Page"
          value={loading ? "..." : `${currentPage}/${totalPages}`}
          change="-"
          icon={BookOpen}
          trend="up"
          color="purple"
        />
      </div>

      {/* Teachers List */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Teachers List ({totalTeachers} Total)
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            <span className="ml-3 text-gray-600">Loading teachers...</span>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No teachers found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Employee ID
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Phone
                  </th>

                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Specialization
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Qualification
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-fuchsia-500/10 hover:to-pink-500/10 transition-all duration-300"
                  >
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 text-sm font-medium border border-purple-500/30">
                        {teacher.teacher_profile?.employee_id || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold shadow-md">
                          {teacher.full_name?.charAt(0).toUpperCase() || "T"}
                        </div>
                        <span className="font-medium text-gray-800">
                          {teacher.full_name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {teacher.email || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {teacher.phone || "N/A"}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 text-sm font-medium border border-blue-500/30">
                        {teacher.teacher_profile?.specialization || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {teacher.teacher_profile?.qualification || "N/A"}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          teacher.is_active
                            ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 border border-emerald-500/30"
                            : "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 border border-orange-500/30"
                        }`}
                      >
                        {teacher.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleToggleStatus(teacher.id, teacher.is_active)
                          }
                          disabled={togglingId === teacher.id}
                          className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-md border ${
                            teacher.is_active
                              ? "bg-gradient-to-br from-emerald-500/20 to-green-500/20 text-emerald-600 hover:from-emerald-500/30 hover:to-green-500/30 border-emerald-500/30"
                              : "bg-gradient-to-br from-red-500/20 to-rose-500/20 text-red-600 hover:from-red-500/30 hover:to-rose-500/30 border-red-500/30"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          title={teacher.is_active ? "Deactivate" : "Activate"}
                        >
                          {togglingId === teacher.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Power className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-blue-500/30">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-red-500/30">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Teacher Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Teachers by Specialization
          </h2>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
          ) : (
            <div className="space-y-3">
              {teachers.reduce((acc, teacher) => {
                const spec =
                  teacher.teacher_profile?.specialization || "Not Specified";
                acc[spec] = (acc[spec] || 0) + 1;
                return acc;
              }, {}) &&
                Object.entries(
                  teachers.reduce((acc, teacher) => {
                    const spec =
                      teacher.teacher_profile?.specialization ||
                      "Not Specified";
                    acc[spec] = (acc[spec] || 0) + 1;
                    return acc;
                  }, {}),
                ).map(([spec, count]) => (
                  <div
                    key={spec}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/50"
                  >
                    <span className="font-medium text-gray-700">{spec}</span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-700 font-semibold">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Registrations
          </h2>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            </div>
          ) : (
            <div className="space-y-3">
              {teachers.slice(0, 5).map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-sm">
                      {teacher.full_name?.charAt(0).toUpperCase() || "T"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {teacher.full_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {teacher.teacher_profile?.specialization || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {teacher.created_date}
                    </p>
                    <p className="text-xs text-gray-500">
                      {teacher.created_time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Teacher Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create New Teacher
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="teacher@school.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="+1 234-567-8900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., Mathematics"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
                >
                  Create Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
