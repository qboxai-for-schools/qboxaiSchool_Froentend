import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  School,
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Upload,
  X,
  User,
  GraduationCap,
  Edit,
  Trash2,
  Search,
  Loader2,
  Download,
  Eye,
  FileDown,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const classStrengthData = [
  { class: "Grade 1", students: 35 },
  { class: "Grade 2", students: 38 },
  { class: "Grade 3", students: 42 },
  { class: "Grade 4", students: 40 },
  { class: "Grade 5", students: 36 },
  { class: "Grade 6", students: 39 },
];

const performanceData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 88 },
  { subject: "English", score: 82 },
  { subject: "History", score: 79 },
  { subject: "Arts", score: 90 },
  { subject: "PE", score: 87 },
];

export default function Classes() {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Fetch classes from API
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/grades/grade_list", {
        params: {
          page: page,
          page_size: 10,
        },
      });

      const data = response.data;
      setClasses(data.data || []);
      setTotalRecords(data.total_records || 0);
      setTotalPages(data.total_pages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [page]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/grades/create_grade", formData);
      setShowCreateForm(false);
      setFormData({ name: "", description: "" });
      fetchClasses(); // Refresh the list
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Error creating grade. Please try again.");
    }
  };

  const handleViewDetails = (gradeId) => {
    navigate(`/admin/classes/${gradeId}`);
  };

  // Handle active/inactive toggle
  const handleToggleActive = async (classId, currentStatus) => {
    try {
      await api.patch(`/users/${classId}`, {
        is_active: !currentStatus,
      });
      
      // Update local state
      setClasses(prevClasses =>
        prevClasses.map(cls =>
          cls.id === classId ? { ...cls, is_active: !currentStatus } : cls
        )
      );
      
      alert(`Grade ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error("Error toggling grade status:", error);
      alert("Error updating grade status. Please try again.");
    }
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
        const response = await api.post("/grades/bulk-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 120000, // 2 minutes timeout
        });

        alert("Grades uploaded successfully!");
        fetchClasses(); // Refresh the list
      } catch (error) {
        console.error("Error uploading file:", error);
        
        if (error.code === 'ECONNABORTED') {
          alert("Upload timeout! Please try with a smaller file or check your internet connection.");
        } else {
          alert(
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
    const link = document.createElement("a");
    link.href = "/assets/grades_bulk_upload_template.csv";
    link.download = "grades_bulk_upload_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter classes based on search
  const filteredClasses = classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8">
      {/* Header with Buttons */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Classes Management
          </h1>
          <p className="text-gray-600">
            Overview of all classes and their performance
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
            Create Class
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Grades"
          value={totalRecords.toString()}
          change="+2"
          icon={School}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Total Sections"
          value={classes
            .reduce((acc, cls) => acc + cls.sections_count, 0)
            .toString()}
          change="+5"
          icon={BookOpen}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Avg Sections"
          value={Math.round(
            classes.reduce((acc, cls) => acc + cls.sections_count, 0) /
              (classes.length || 1),
          ).toString()}
          change="+1"
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Performance"
          value="85%"
          change="+4%"
          icon={TrendingUp}
          trend="up"
          color="pink"
        />
      </div>

      {/* Classes List */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Grades List</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search grades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 w-64 bg-white/50"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            <span className="ml-3 text-gray-600">Loading classes...</span>
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center py-20">
            <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No classes found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200/50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Grade Name
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Sections Count
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Created At
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.map((classItem) => (
                    <tr
                      key={classItem.id}
                      className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-fuchsia-500/10 hover:to-pink-500/10 transition-all duration-300"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold shadow-md">
                            {classItem.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">
                            {classItem.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {classItem.description || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold text-gray-800">
                            {classItem.sections_count}
                          </span>
                          <span className="text-sm text-gray-500">
                            sections
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            classItem.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {classItem.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {new Date(classItem.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {/* Toggle Active/Inactive Button */}
                          <button
                            onClick={() => handleToggleActive(classItem.id, classItem.is_active)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                              classItem.is_active
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            title={classItem.is_active ? "Deactivate" : "Activate"}
                          >
                            <span
                              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                classItem.is_active
                                  ? "translate-x-7"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>

                          <button
                            onClick={() => handleViewDetails(classItem.id)}
                            className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-blue-500/30"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-600 hover:from-violet-500/30 hover:to-purple-500/30 transition-all duration-300 backdrop-blur-md border border-violet-500/30"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-red-500/30"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Class Strength
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classStrengthData}>
              <defs>
                <linearGradient id="classBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#db2777" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(236, 72, 153, 0.2)",
                  borderRadius: "12px",
                }}
              />
              <Bar
                dataKey="students"
                fill="url(#classBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Subject Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#f59e0b"
                fill="url(#radarGradient)"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create New Grade
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
                  Grade Name
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., LKG, UKG, 1, 2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all backdrop-blur-sm"
                    placeholder="e.g., Lower Kindergarten, 1st Standard"
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
                  Create Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
