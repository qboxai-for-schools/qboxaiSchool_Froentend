import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Plus,
  X,
  FileText,
  Edit,
  Trash2,
  Loader2,
  PlusCircle,
  MinusCircle,
  Eye,
  Code,
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import api from "../../services/api";
import { toast, Toaster } from "sonner";

export default function Courses() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [creating, setCreating] = useState(false);

  // Multiple subjects form - array of subjects
  const [subjectsForm, setSubjectsForm] = useState([
    { name: "", code: "", description: "" },
  ]);

  // Fetch subjects from API
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/grade-subjects/subjects/dropdown");
      setSubjects(response.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subject details
  const fetchSubjectDetails = async (subjectId) => {
    try {
      setLoadingDetails(true);
      const response = await api.get(`/subjects/${subjectId}`);
      setSubjectDetails(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching subject details:", error);
      toast.error("Failed to load subject details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add new subject row to form
  const handleAddSubjectRow = () => {
    setSubjectsForm([...subjectsForm, { name: "", code: "", description: "" }]);
  };

  // Remove subject row from form
  const handleRemoveSubjectRow = (index) => {
    if (subjectsForm.length > 1) {
      const newSubjects = subjectsForm.filter((_, i) => i !== index);
      setSubjectsForm(newSubjects);
    }
  };

  // Update subject form field
  const handleSubjectFormChange = (index, field, value) => {
    const newSubjects = [...subjectsForm];
    newSubjects[index][field] = value;
    setSubjectsForm(newSubjects);
  };

  // Submit multiple subjects
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all subjects
    const validSubjects = subjectsForm.filter(
      (subject) => subject.name && subject.code,
    );

    if (validSubjects.length === 0) {
      toast.error("Please fill in at least one subject with name and code.");
      return;
    }

    try {
      setCreating(true);
      await api.post("/subjects", {
        subjects: validSubjects,
      });

      toast.success(`${validSubjects.length} subject(s) created successfully!`);
      setShowCreateForm(false);
      setSubjectsForm([{ name: "", code: "", description: "" }]);
      fetchSubjects(); // Refresh the list
    } catch (error) {
      console.error("Error creating subjects:", error);
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to create subjects. Please try again.",
      );
    } finally {
      setCreating(false);
    }
  };

  // Delete subject
  const handleDeleteSubject = async (subjectId) => {
    if (!confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    try {
      await api.delete(`/subjects/${subjectId}`);
      toast.success("Subject deleted successfully!");
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error("Failed to delete subject. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" richColors />

      {/* Header with Buttons */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Subjects Management
          </h1>
          <p className="text-gray-600">
            Manage subjects and track completion rates
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
          >
            <Plus className="w-5 h-5" />
            Create Subject(s)
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Subjects"
          value={subjects.length.toString()}
          change="-"
          icon={BookOpen}
          trend="up"
          color="blue"
        />
        <StatsCard
          title="Active Subjects"
          value={subjects.length.toString()}
          change="-"
          icon={TrendingUp}
          trend="up"
          color="green"
        />
        <StatsCard
          title="Total Enrollments"
          value="-"
          change="-"
          icon={Users}
          trend="up"
          color="purple"
        />
        <StatsCard
          title="Completion Rate"
          value="-"
          change="-"
          icon={Award}
          trend="up"
          color="cyan"
        />
      </div>

      {/* Subjects Grid */}
      <div className="glass-card rounded-2xl p-6 mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Subjects List
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
            <span className="ml-3 text-gray-600">Loading subjects...</span>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No subjects found</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first subject to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="group relative glass-card rounded-lg p-4 backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {/* Subject Icon/Initial */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-lg">
                    {subject.label?.charAt(0) || "S"}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => fetchSubjectDetails(subject.id)}
                      className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-600 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-blue-500/30 opacity-0 group-hover:opacity-100"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-600 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-red-500/30 opacity-0 group-hover:opacity-100"
                      title="Delete Subject"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subject Name */}
                <h3 className="text-base font-bold text-gray-800 mb-2">
                  {subject.label}
                </h3>

                {/* Footer */}
                <div className="pt-3 border-t border-gray-200/50">
                  <button
                    onClick={() => fetchSubjectDetails(subject.id)}
                    className="w-full text-center text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subject Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-2xl w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Subject Details
              </h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSubjectDetails(null);
                }}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {loadingDetails ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
              </div>
            ) : subjectDetails ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Subject Name
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {subjectDetails.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Subject Code
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {subjectDetails.code}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <p className="text-gray-700">
                    {subjectDetails.description || "No description provided"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Created At
                    </label>
                    <p className="text-sm text-gray-700">
                      {new Date(subjectDetails.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Updated At
                    </label>
                    <p className="text-sm text-gray-700">
                      {new Date(subjectDetails.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Subject ID
                  </label>
                  <p className="text-xs font-mono text-gray-500 bg-gray-100 p-2 rounded">
                    {subjectDetails.id}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">
                No details available
              </p>
            )}
          </div>
        </div>
      )}

      {/* Create Subject(s) Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-card rounded-2xl p-8 max-w-3xl w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl animate-in my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Create New Subject(s)
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setSubjectsForm([{ name: "", code: "", description: "" }]);
                }}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dynamic Subject Rows */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {subjectsForm.map((subject, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 border border-violet-200/50 space-y-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Subject #{index + 1}
                      </h3>
                      {subjectsForm.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSubjectRow(index)}
                          className="p-1 rounded-lg text-red-600 hover:bg-red-100 transition-all"
                          title="Remove Subject"
                        >
                          <MinusCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject Name *
                        </label>
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) =>
                            handleSubjectFormChange(
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                          required
                          className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                          placeholder="e.g., Mathematics"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject Code *
                        </label>
                        <input
                          type="text"
                          value={subject.code}
                          onChange={(e) =>
                            handleSubjectFormChange(
                              index,
                              "code",
                              e.target.value.toUpperCase(),
                            )
                          }
                          required
                          className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all uppercase"
                          placeholder="e.g., MATH"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={subject.description}
                        onChange={(e) =>
                          handleSubjectFormChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none"
                        placeholder="Enter subject description (optional)"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Button */}
              <button
                type="button"
                onClick={handleAddSubjectRow}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-700 font-medium hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 border border-blue-500/30"
              >
                <PlusCircle className="w-5 h-5" />
                Add Another Subject
              </button>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setSubjectsForm([{ name: "", code: "", description: "" }]);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                  disabled={creating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create {subjectsForm.length} Subject(s)
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
