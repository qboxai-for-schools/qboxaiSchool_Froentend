import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  School,
  Users,
  Calendar,
  Edit,
  Plus,
  Trash2,
  UserCheck,
  BookOpen,
  Loader2,
  X,
} from "lucide-react";
import api from "../../services/api";

export default function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [sectionFormData, setSectionFormData] = useState({
    section: "",
    capacity: "",
  });

  // Fetch class details
  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/grades/grade_details/${id}`);
      setClassData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching class details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, [id]);

  const handleAddSection = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/grades/${id}/add_section`, sectionFormData);
      setShowAddSectionModal(false);
      setSectionFormData({ section: "", capacity: "" });
      fetchClassDetails(); // Refresh data
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto" />
          <span className="ml-3 text-gray-600 text-lg mt-4 block">
            Loading class details...
          </span>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
        <div className="text-center py-20">
          <School className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Class not found</p>
          <button
            onClick={() => navigate("/dashboard/admin/classes")}
            className="mt-4 px-6 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600"
          >
            Back to Classes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/dashboard/admin/classes")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Classes
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Grade {classData.name}
            </h1>
            <p className="text-gray-600 text-lg">{classData.description}</p>
          </div>
          <button
            onClick={() => setShowAddSectionModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add Section
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <School className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Grade Name</p>
              <p className="text-2xl font-bold text-gray-800">
                {classData.name}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total Sections
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {classData.sections?.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total Capacity
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {classData.sections?.reduce(
                  (acc, sec) => acc + sec.capacity,
                  0,
                ) || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Created On</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date(classData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Sections</h2>
          <span className="text-sm text-gray-600">
            {classData.sections?.length || 0} sections available
          </span>
        </div>

        {!classData.sections || classData.sections.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No sections yet</p>
            <p className="text-gray-400 text-sm mb-6">
              Create a section to get started
            </p>
            <button
              onClick={() => setShowAddSectionModal(true)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-600 hover:to-fuchsia-600 transition-all"
            >
              Add First Section
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classData.sections.map((section) => (
              <div
                key={section.classroom_id}
                className="glass-card rounded-xl p-6 backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/40 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {section.section}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {section.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Section {section.section}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Capacity</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {section.capacity} students
                    </span>
                  </div>

                  <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-600 hover:to-fuchsia-600 transition-all flex items-center justify-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    View Students
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Add New Section
              </h2>
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddSection} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name
                </label>
                <input
                  type="text"
                  value={sectionFormData.section}
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      section: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                  placeholder="e.g., A, B, C"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={sectionFormData.capacity}
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      capacity: e.target.value,
                    })
                  }
                  required
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                  placeholder="e.g., 30"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddSectionModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-500/20 text-gray-700 font-medium hover:bg-gray-500/30 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-600 hover:to-fuchsia-600 transition-all"
                >
                  Add Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
