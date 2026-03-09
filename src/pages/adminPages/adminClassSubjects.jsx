import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpen,
  ArrowLeft,
  Loader2,
  School,
  Plus,
  Trash2,
  X,
  UserCog,
  User,
  BookMarked,
} from "lucide-react";
import api from "../../services/api";

export default function ClassSubjects() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [gradeName, setGradeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [subjectDropdown, setSubjectDropdown] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [addingSubject, setAddingSubject] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);

  // Assign teacher state
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [assigningSubject, setAssigningSubject] = useState(null); // { id, name }
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [assigningTeacher, setAssigningTeacher] = useState(false);

  // Subject teacher map: { subject_id: { teacher, mapping_id } }
  const [subjectTeacherMap, setSubjectTeacherMap] = useState({});
  const [loadingSubjectTeachers, setLoadingSubjectTeachers] = useState(false);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/grade-subjects", {
        params: { grade_id: id },
      });
      const data = response.data;
      const subjectList = Array.isArray(data) ? data : [];
      setSubjects(subjectList);
      if (subjectList.length > 0) {
        const gName = subjectList[0].grade_name || "";
        setGradeName(gName);
        fetchSubjectTeachers(subjectList, gName);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectTeachers = async (subjectList, gName) => {
    if (!subjectList.length || !gName) return;
    try {
      setLoadingSubjectTeachers(true);
      const results = await Promise.allSettled(
        subjectList.map((s) =>
          api.get("/grade-subject-teachers", {
            params: { grade_name: gName, subject_name: s.subject_name },
          }),
        ),
      );
      const map = {};
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const items = result.value.data;
          if (Array.isArray(items) && items.length > 0) {
            const subjectId = subjectList[index].subject_id;
            map[subjectId] = items[0]; // first assigned teacher
          }
        }
      });
      setSubjectTeacherMap(map);
    } catch (error) {
      console.error("Error fetching subject teachers:", error);
    } finally {
      setLoadingSubjectTeachers(false);
    }
  };

  const fetchSubjectDropdown = async () => {
    try {
      setLoadingDropdown(true);
      const response = await api.get("/grade-subjects/subjects/dropdown");
      setSubjectDropdown(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching subject dropdown:", error);
    } finally {
      setLoadingDropdown(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [id]);

  const handleOpenAddModal = async () => {
    setShowAddModal(true);
    setSelectedSubjectIds([]);
    if (subjectDropdown.length === 0) {
      await fetchSubjectDropdown();
    }
  };

  const toggleSubjectSelection = (subjectId) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(subjectId)
        ? prev.filter((sid) => sid !== subjectId)
        : [...prev, subjectId],
    );
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!selectedSubjectIds.length) return;
    try {
      setAddingSubject(true);
      await api.post("/grade-subjects", {
        mappings: selectedSubjectIds.map((subject_id) => ({
          grade_id: id,
          subject_id,
        })),
      });
      setShowAddModal(false);
      setSelectedSubjectIds([]);
      fetchSubjects();
    } catch (error) {
      console.error("Error adding subject:", error);
      alert(
        error.response?.data?.message ||
          "Error adding subject. Please try again.",
      );
    } finally {
      setAddingSubject(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      setLoadingTeachers(true);
      const response = await api.get("/users/list-users", {
        params: { page: 1, page_size: 100, role: "teacher" },
      });
      setTeachers(response.data?.items || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const handleOpenAssignTeacher = async (subject) => {
    setAssigningSubject(subject);
    setSelectedTeacherId("");
    setShowAssignTeacherModal(true);
    if (teachers.length === 0) {
      await fetchTeachers();
    }
  };

  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    if (!selectedTeacherId || !assigningSubject) return;
    try {
      setAssigningTeacher(true);
      await api.post("/grade-subject-teachers/bulk-assign", {
        grade_id: id,
        assignments: [
          {
            subject_id: assigningSubject.subject_id,
            teacher_id: selectedTeacherId,
          },
        ],
      });
      setShowAssignTeacherModal(false);
      setAssigningSubject(null);
      setSelectedTeacherId("");
      alert("Teacher assigned successfully!");
      fetchSubjects(); // refresh to show updated teacher
    } catch (error) {
      console.error("Error assigning teacher:", error);
      alert(
        error.response?.data?.message ||
          "Error assigning teacher. Please try again.",
      );
    } finally {
      setAssigningTeacher(false);
    }
  };

  // Filter out subjects already assigned to this grade from the dropdown
  const assignedSubjectIds = new Set(subjects.map((s) => s.subject_id));
  const availableSubjects = subjectDropdown.filter(
    (s) => !assignedSubjectIds.has(s.id),
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/60 border border-white/30 shadow hover:shadow-md transition-all duration-300 backdrop-blur-md"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {gradeName ? `Grade ${gradeName} — Subjects` : "Grade Subjects"}
            </h1>
            <p className="text-gray-600">All subjects assigned to this grade</p>
          </div>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
        >
          <Plus className="w-5 h-5" />
          Add Subject
        </button>
      </div>

      {/* Subjects Table */}
      <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Assigned Subjects
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({subjects.length} total)
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            <span className="ml-3 text-gray-600">Loading subjects...</span>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No subjects assigned to this grade yet
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:scale-105 transition-all duration-300 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add First Subject
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    #
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Subject Name
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Grade
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Subject Teacher
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr
                    key={subject.id}
                    className="border-b border-gray-200/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-fuchsia-500/10 hover:to-pink-500/10 transition-all duration-300"
                  >
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-md text-sm">
                          {subject.subject_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {subject.subject_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">
                          Grade {subject.grade_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          subject.is_deleted
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${subject.is_deleted ? "bg-red-500" : "bg-emerald-500"}`}
                        />
                        {subject.is_deleted ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {loadingSubjectTeachers ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />
                        ) : subjectTeacherMap[subject.subject_id] ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200">
                            <User className="w-3 h-3" />
                            {subjectTeacherMap[subject.subject_id].teacher}
                          </span>
                        ) : null}
                        <button
                          onClick={() => handleOpenAssignTeacher(subject)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-700 hover:from-indigo-500/30 hover:to-blue-500/30 transition-all duration-300 backdrop-blur-md border border-indigo-500/30 text-xs font-medium"
                          title="Assign Teacher"
                        >
                          <UserCog className="w-3.5 h-3.5" />
                          {subjectTeacherMap[subject.subject_id]
                            ? "Change"
                            : "Assign Teacher"}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/classes/${id}/subjects/${subject.id}/syllabus`,
                            {
                              state: {
                                subjectName: subject.subject_name,
                                gradeName: subject.grade_name,
                              },
                            },
                          )
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-violet-700 hover:from-violet-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-md border border-violet-500/30 text-xs font-medium"
                        title="View Syllabus"
                      >
                        <BookMarked className="w-3.5 h-3.5" />
                        View Syllabus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Teacher Modal */}
      {showAssignTeacherModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Assign Teacher
              </h2>
              <button
                onClick={() => setShowAssignTeacherModal(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {assigningSubject && (
              <p className="text-sm text-gray-500 mb-6">
                Assigning teacher for{" "}
                <span className="font-semibold text-gray-700">
                  {assigningSubject.subject_name}
                </span>
              </p>
            )}

            <form onSubmit={handleAssignTeacher} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Teacher
                </label>
                {loadingTeachers ? (
                  <div className="flex items-center gap-2 text-gray-500 py-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading teachers...</span>
                  </div>
                ) : (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-gray-300/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all backdrop-blur-sm appearance-none text-gray-700"
                    >
                      <option value="">-- Choose a teacher --</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.full_name}
                          {teacher.teacher_profile?.specialization
                            ? ` — ${teacher.teacher_profile.specialization}`
                            : ""}
                        </option>
                      ))}
                    </select>
                    {teachers.length === 0 && !loadingTeachers && (
                      <p className="text-xs text-gray-500 mt-1">
                        No teachers found.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAssignTeacherModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigningTeacher || !selectedTeacherId}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {assigningTeacher ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    <>
                      <UserCog className="w-4 h-4" />
                      Assign Teacher
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Add Subject
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Subjects
                  {selectedSubjectIds.length > 0 && (
                    <span className="ml-2 text-xs font-normal text-violet-600">
                      ({selectedSubjectIds.length} selected)
                    </span>
                  )}
                </label>
                {loadingDropdown ? (
                  <div className="flex items-center gap-2 text-gray-500 py-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading subjects...</span>
                  </div>
                ) : availableSubjects.length === 0 ? (
                  <p className="text-xs text-gray-500 py-2">
                    All available subjects are already assigned.
                  </p>
                ) : (
                  <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-300/50 bg-white/50 backdrop-blur-sm divide-y divide-gray-100">
                    {availableSubjects.map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-violet-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubjectIds.includes(subject.id)}
                          onChange={() => toggleSubjectSelection(subject.id)}
                          className="w-4 h-4 rounded accent-violet-500"
                        />
                        <span className="text-sm text-gray-700">
                          {subject.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingSubject || !selectedSubjectIds.length}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {addingSubject ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Subject
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
