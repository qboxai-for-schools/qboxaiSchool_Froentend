import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  BookOpen,
  ArrowLeft,
  Loader2,
  Plus,
  X,
  Trash2,
  ListOrdered,
  FileText,
  ChevronDown,
  ChevronRight,
  BookmarkCheck,
  Hash,
} from "lucide-react";
import api from "../../services/api";

export default function ClassSubjectSyllabus() {
  const { classId, gradeSubjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const subjectName = location.state?.subjectName || "Subject";
  const gradeName = location.state?.gradeName || "";

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingUnits, setAddingUnits] = useState(false);
  const [unitRows, setUnitRows] = useState([{ name: "", description: "" }]);

  // Chapters state
  const [expandedUnitIds, setExpandedUnitIds] = useState(new Set());
  const [chaptersMap, setChaptersMap] = useState({});
  const [loadingChapters, setLoadingChapters] = useState({});
  const [showAddChapterFor, setShowAddChapterFor] = useState(null);
  const [chapterRows, setChapterRows] = useState([
    { name: "", description: "" },
  ]);
  const [addingChapters, setAddingChapters] = useState(false);

  // Topics state
  const [expandedChapterIds, setExpandedChapterIds] = useState(new Set());
  const [topicsMap, setTopicsMap] = useState({});
  const [loadingTopics, setLoadingTopics] = useState({});
  const [showAddTopicFor, setShowAddTopicFor] = useState(null);
  const [topicRows, setTopicRows] = useState([{ name: "", description: "" }]);
  const [addingTopics, setAddingTopics] = useState(false);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const response = await api.get("/units/", {
        params: { grade_subject_id: gradeSubjectId },
      });
      const data = response.data;
      setUnits(Array.isArray(data?.items) ? data.items : []);
    } catch (error) {
      console.error("Error fetching units:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [gradeSubjectId]);

  const fetchChapters = async (unitId) => {
    if (chaptersMap[unitId]) return;
    try {
      setLoadingChapters((prev) => ({ ...prev, [unitId]: true }));
      const response = await api.get("/chapters", {
        params: { unit_id: unitId },
      });
      const data = response.data;
      setChaptersMap((prev) => ({
        ...prev,
        [unitId]: Array.isArray(data?.items) ? data.items : [],
      }));
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setChaptersMap((prev) => ({ ...prev, [unitId]: [] }));
    } finally {
      setLoadingChapters((prev) => ({ ...prev, [unitId]: false }));
    }
  };

  const handleToggleUnit = (unitId) => {
    setExpandedUnitIds((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
        setShowAddChapterFor((cur) => (cur === unitId ? null : cur));
      } else {
        next.add(unitId);
        fetchChapters(unitId);
      }
      return next;
    });
  };

  const handleOpenAddChapter = (unitId) => {
    setChapterRows([{ name: "", description: "" }]);
    setShowAddChapterFor(unitId);
  };

  const handleChapterRowChange = (index, field, value) => {
    setChapterRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const handleAddChapterRow = () => {
    setChapterRows((prev) => [...prev, { name: "", description: "" }]);
  };

  const handleRemoveChapterRow = (index) => {
    setChapterRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddChapters = async (e, unitId) => {
    e.preventDefault();
    const validRows = chapterRows.filter((r) => r.name.trim());
    if (!validRows.length) return;
    try {
      setAddingChapters(true);
      await api.post("/chapters/bulk", {
        unit_id: unitId,
        chapters: validRows.map((r) => ({
          name: r.name.trim(),
          description: r.description.trim(),
        })),
      });
      setShowAddChapterFor(null);
      // Force refetch chapters for this unit
      setChaptersMap((prev) => {
        const next = { ...prev };
        delete next[unitId];
        return next;
      });
      fetchChapters(unitId);
    } catch (error) {
      console.error("Error adding chapters:", error);
      alert(
        error.response?.data?.message ||
          "Error adding chapters. Please try again.",
      );
    } finally {
      setAddingChapters(false);
    }
  };

  // ── Topics ──────────────────────────────────────────────────────────────
  const fetchTopics = async (chapterId) => {
    if (topicsMap[chapterId]) return;
    try {
      setLoadingTopics((prev) => ({ ...prev, [chapterId]: true }));
      const response = await api.get("/topics/", {
        params: { chapter_id: chapterId },
      });
      const data = response.data;
      setTopicsMap((prev) => ({
        ...prev,
        [chapterId]: Array.isArray(data?.items) ? data.items : [],
      }));
    } catch (error) {
      console.error("Error fetching topics:", error);
      setTopicsMap((prev) => ({ ...prev, [chapterId]: [] }));
    } finally {
      setLoadingTopics((prev) => ({ ...prev, [chapterId]: false }));
    }
  };

  const handleToggleChapter = (chapterId) => {
    setExpandedChapterIds((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
        setShowAddTopicFor((cur) => (cur === chapterId ? null : cur));
      } else {
        next.add(chapterId);
        fetchTopics(chapterId);
      }
      return next;
    });
  };

  const handleOpenAddTopic = (chapterId) => {
    setTopicRows([{ name: "", description: "" }]);
    setShowAddTopicFor(chapterId);
  };

  const handleTopicRowChange = (index, field, value) => {
    setTopicRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const handleAddTopicRow = () => {
    setTopicRows((prev) => [...prev, { name: "", description: "" }]);
  };

  const handleRemoveTopicRow = (index) => {
    setTopicRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTopics = async (e, chapterId) => {
    e.preventDefault();
    const validRows = topicRows.filter((r) => r.name.trim());
    if (!validRows.length) return;
    try {
      setAddingTopics(true);
      await api.post("/topics/bulk", {
        chapter_id: chapterId,
        topics: validRows.map((r) => ({
          name: r.name.trim(),
          ...(r.description.trim() && { description: r.description.trim() }),
        })),
      });
      setShowAddTopicFor(null);
      setTopicsMap((prev) => {
        const next = { ...prev };
        delete next[chapterId];
        return next;
      });
      fetchTopics(chapterId);
    } catch (error) {
      console.error("Error adding topics:", error);
      alert(
        error.response?.data?.message ||
          "Error adding topics. Please try again.",
      );
    } finally {
      setAddingTopics(false);
    }
  };

  const handleOpenAddModal = () => {
    setUnitRows([{ name: "", description: "" }]);
    setShowAddModal(true);
  };

  const handleAddRow = () => {
    setUnitRows((prev) => [...prev, { name: "", description: "" }]);
  };

  const handleRemoveRow = (index) => {
    setUnitRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setUnitRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const handleAddUnits = async (e) => {
    e.preventDefault();
    const validRows = unitRows.filter((r) => r.name.trim());
    if (!validRows.length) return;
    try {
      setAddingUnits(true);
      await api.post("/units/bulk", {
        grade_subject_id: gradeSubjectId,
        units: validRows.map((r) => ({
          name: r.name.trim(),
          description: r.description.trim(),
        })),
      });
      setShowAddModal(false);
      fetchUnits();
    } catch (error) {
      console.error("Error adding units:", error);
      alert(
        error.response?.data?.message ||
          "Error adding units. Please try again.",
      );
    } finally {
      setAddingUnits(false);
    }
  };

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
              {gradeName ? `Grade ${gradeName} — ` : ""}
              {subjectName} Syllabus
            </h1>
            <p className="text-gray-600">Units covered in this subject</p>
          </div>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
        >
          <Plus className="w-5 h-5" />
          Add Units
        </button>
      </div>

      {/* Units Table */}
      <div className="glass-card rounded-2xl p-6 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-md">
            <ListOrdered className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Units
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({units.length} total)
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            <span className="ml-3 text-gray-600">Loading units...</span>
          </div>
        ) : units.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No units added to this subject yet
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500/90 via-fuchsia-500/90 to-pink-500/90 text-white font-medium shadow-lg shadow-violet-500/30 hover:scale-105 transition-all duration-300 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add First Unit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {units
              .slice()
              .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
              .map((unit) => {
                const isExpanded = expandedUnitIds.has(unit.id);
                const chapters = chaptersMap[unit.id] || [];
                const isLoadingChapters = loadingChapters[unit.id];
                const isAddingChaptersHere = showAddChapterFor === unit.id;

                return (
                  <div
                    key={unit.id}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "border-violet-300/60 bg-gradient-to-br from-violet-50/80 to-pink-50/80 shadow-md"
                        : "border-gray-200/50 bg-white/50 hover:border-violet-200/60 hover:bg-violet-50/30"
                    }`}
                  >
                    {/* Unit Header — click to expand */}
                    <button
                      onClick={() => handleToggleUnit(unit.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-pink-100 text-violet-700 font-semibold text-sm shrink-0">
                        {unit.order_index ?? "—"}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white shadow-md shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800">
                          {unit.name}
                        </p>
                        {unit.description && (
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {unit.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-400 font-medium">
                          {isExpanded ? "Hide chapters" : "View chapters"}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-violet-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Chapters Section */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-violet-200/40">
                        <div className="flex items-center justify-between mt-4 mb-3">
                          <div className="flex items-center gap-2">
                            <BookmarkCheck className="w-4 h-4 text-violet-500" />
                            <span className="text-sm font-semibold text-gray-700">
                              Chapters
                              {!isLoadingChapters && (
                                <span className="ml-1.5 text-xs font-normal text-gray-400">
                                  ({chapters.length})
                                </span>
                              )}
                            </span>
                          </div>
                          {!isAddingChaptersHere && (
                            <button
                              onClick={() => handleOpenAddChapter(unit.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-violet-700 hover:from-violet-500/30 hover:to-pink-500/30 transition-all border border-violet-300/40 text-xs font-medium"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add Chapters
                            </button>
                          )}
                        </div>

                        {/* Chapters list */}
                        {isLoadingChapters ? (
                          <div className="flex items-center gap-2 py-4 text-gray-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Loading chapters...</span>
                          </div>
                        ) : chapters.length === 0 && !isAddingChaptersHere ? (
                          <div className="text-center py-5">
                            <p className="text-sm text-gray-400">
                              No chapters yet.{" "}
                              <button
                                onClick={() => handleOpenAddChapter(unit.id)}
                                className="text-violet-600 underline underline-offset-2 hover:text-violet-800"
                              >
                                Add the first chapter
                              </button>
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2 mb-3">
                            {chapters
                              .slice()
                              .sort(
                                (a, b) =>
                                  (a.order_index ?? 0) - (b.order_index ?? 0),
                              )
                              .map((chapter) => {
                                const isChapterExpanded =
                                  expandedChapterIds.has(chapter.id);
                                const topics = topicsMap[chapter.id] || [];
                                const isLoadingTopics =
                                  loadingTopics[chapter.id];
                                const isAddingTopicsHere =
                                  showAddTopicFor === chapter.id;

                                return (
                                  <div
                                    key={chapter.id}
                                    className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                                      isChapterExpanded
                                        ? "border-indigo-300/60 bg-gradient-to-br from-indigo-50/80 to-violet-50/80 shadow-sm"
                                        : "bg-white/70 border-gray-200/50 hover:border-indigo-200/60"
                                    }`}
                                  >
                                    {/* Chapter header — click to expand topics */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleToggleChapter(chapter.id)
                                      }
                                      className="w-full flex items-center gap-3 px-4 py-3 text-left"
                                    >
                                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-xs shrink-0">
                                        {chapter.order_index ?? "—"}
                                      </span>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800">
                                          {chapter.name}
                                        </p>
                                        {chapter.description && (
                                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                                            {chapter.description}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-xs text-gray-400">
                                          {isChapterExpanded
                                            ? "Hide topics"
                                            : "View topics"}
                                        </span>
                                        {isChapterExpanded ? (
                                          <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                                        ) : (
                                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                        )}
                                      </div>
                                    </button>

                                    {/* Expanded Topics Section */}
                                    {isChapterExpanded && (
                                      <div className="px-4 pb-4 border-t border-indigo-200/40">
                                        <div className="flex items-center justify-between mt-3 mb-2">
                                          <div className="flex items-center gap-1.5">
                                            <Hash className="w-3.5 h-3.5 text-indigo-400" />
                                            <span className="text-xs font-semibold text-gray-600">
                                              Topics
                                              {!isLoadingTopics && (
                                                <span className="ml-1 font-normal text-gray-400">
                                                  ({topics.length})
                                                </span>
                                              )}
                                            </span>
                                          </div>
                                          {!isAddingTopicsHere && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleOpenAddTopic(chapter.id)
                                              }
                                              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-200/60 text-xs font-medium"
                                            >
                                              <Plus className="w-3 h-3" />
                                              Add Topics
                                            </button>
                                          )}
                                        </div>

                                        {/* Topics list */}
                                        {isLoadingTopics ? (
                                          <div className="flex items-center gap-2 py-3 text-gray-400">
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span className="text-xs">
                                              Loading topics...
                                            </span>
                                          </div>
                                        ) : topics.length === 0 &&
                                          !isAddingTopicsHere ? (
                                          <div className="text-center py-4">
                                            <p className="text-xs text-gray-400">
                                              No topics yet.{" "}
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleOpenAddTopic(chapter.id)
                                                }
                                                className="text-indigo-500 underline underline-offset-2 hover:text-indigo-700"
                                              >
                                                Add the first topic
                                              </button>
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="space-y-1.5 mb-2">
                                            {topics
                                              .slice()
                                              .sort(
                                                (a, b) =>
                                                  (a.order_index ?? 0) -
                                                  (b.order_index ?? 0),
                                              )
                                              .map((topic) => (
                                                <div
                                                  key={topic.id}
                                                  className="flex items-start gap-2.5 px-3 py-2 rounded-md bg-white/80 border border-gray-100"
                                                >
                                                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-100 text-violet-600 font-semibold text-xs shrink-0 mt-0.5">
                                                    {topic.order_index ?? "—"}
                                                  </span>
                                                  <div>
                                                    <p className="text-xs font-medium text-gray-800">
                                                      {topic.name}
                                                    </p>
                                                    {topic.description && (
                                                      <p className="text-xs text-gray-400 mt-0.5">
                                                        {topic.description}
                                                      </p>
                                                    )}
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                        )}

                                        {/* Inline Add Topics Form */}
                                        {isAddingTopicsHere && (
                                          <form
                                            onSubmit={(e) =>
                                              handleAddTopics(e, chapter.id)
                                            }
                                            className="mt-2 p-3 rounded-xl bg-white/70 border border-indigo-200/60 space-y-2.5"
                                          >
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                              New Topics
                                            </p>
                                            <div className="space-y-2">
                                              {topicRows.map((row, index) => (
                                                <div
                                                  key={index}
                                                  className="flex gap-2 items-start"
                                                >
                                                  <span className="mt-2 text-xs font-semibold text-gray-400 w-4 shrink-0 text-center">
                                                    {index + 1}
                                                  </span>
                                                  <div className="flex-1 space-y-1">
                                                    <input
                                                      type="text"
                                                      placeholder="Topic name *"
                                                      value={row.name}
                                                      onChange={(e) =>
                                                        handleTopicRowChange(
                                                          index,
                                                          "name",
                                                          e.target.value,
                                                        )
                                                      }
                                                      required
                                                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 outline-none transition-all text-xs text-gray-700 placeholder-gray-400"
                                                    />
                                                    <input
                                                      type="text"
                                                      placeholder="Description (optional)"
                                                      value={row.description}
                                                      onChange={(e) =>
                                                        handleTopicRowChange(
                                                          index,
                                                          "description",
                                                          e.target.value,
                                                        )
                                                      }
                                                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 outline-none transition-all text-xs text-gray-700 placeholder-gray-400"
                                                    />
                                                  </div>
                                                  {topicRows.length > 1 && (
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        handleRemoveTopicRow(
                                                          index,
                                                        )
                                                      }
                                                      className="mt-1 p-1 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-all"
                                                    >
                                                      <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                            <button
                                              type="button"
                                              onClick={handleAddTopicRow}
                                              className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border-2 border-dashed border-indigo-200 text-indigo-500 hover:bg-indigo-50 transition-all text-xs font-medium"
                                            >
                                              <Plus className="w-3 h-3" />
                                              Add Another Topic
                                            </button>
                                            <div className="flex gap-2">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setShowAddTopicFor(null)
                                                }
                                                className="flex-1 px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-all"
                                              >
                                                Cancel
                                              </button>
                                              <button
                                                type="submit"
                                                disabled={
                                                  addingTopics ||
                                                  topicRows.every(
                                                    (r) => !r.name.trim(),
                                                  )
                                                }
                                                className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                              >
                                                {addingTopics ? (
                                                  <>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Saving...
                                                  </>
                                                ) : (
                                                  <>
                                                    <Plus className="w-3 h-3" />
                                                    Save Topics
                                                  </>
                                                )}
                                              </button>
                                            </div>
                                          </form>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        {/* Inline Add Chapters Form */}
                        {isAddingChaptersHere && (
                          <form
                            onSubmit={(e) => handleAddChapters(e, unit.id)}
                            className="mt-3 p-4 rounded-xl bg-white/70 border border-violet-200/60 space-y-3"
                          >
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              New Chapters
                            </p>
                            <div className="space-y-2">
                              {chapterRows.map((row, index) => (
                                <div
                                  key={index}
                                  className="flex gap-2 items-start"
                                >
                                  <span className="mt-2.5 text-xs font-semibold text-gray-400 w-4 shrink-0 text-center">
                                    {index + 1}
                                  </span>
                                  <div className="flex-1 space-y-1.5">
                                    <input
                                      type="text"
                                      placeholder="Chapter name *"
                                      value={row.name}
                                      onChange={(e) =>
                                        handleChapterRowChange(
                                          index,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      required
                                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 outline-none transition-all text-sm text-gray-700 placeholder-gray-400"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Description (optional)"
                                      value={row.description}
                                      onChange={(e) =>
                                        handleChapterRowChange(
                                          index,
                                          "description",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 outline-none transition-all text-sm text-gray-700 placeholder-gray-400"
                                    />
                                  </div>
                                  {chapterRows.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveChapterRow(index)
                                      }
                                      className="mt-1.5 p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-all"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={handleAddChapterRow}
                              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 border-dashed border-violet-200 text-violet-500 hover:bg-violet-50 transition-all text-xs font-medium"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add Another Chapter
                            </button>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setShowAddChapterFor(null)}
                                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-all"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={
                                  addingChapters ||
                                  chapterRows.every((r) => !r.name.trim())
                                }
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 text-white text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                              >
                                {addingChapters ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    Save Chapters
                                  </>
                                )}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Add Units Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-lg w-full backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Add Units
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddUnits} className="space-y-4">
              <div className="space-y-3">
                {unitRows.map((row, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-start p-3 rounded-xl bg-white/60 border border-gray-200/50"
                  >
                    <span className="mt-2.5 text-xs font-semibold text-gray-400 w-5 shrink-0 text-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Unit name *"
                        value={row.name}
                        onChange={(e) =>
                          handleRowChange(index, "name", e.target.value)
                        }
                        required
                        className="w-full px-3 py-2 rounded-lg bg-white/70 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm text-gray-700 placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Description (optional)"
                        value={row.description}
                        onChange={(e) =>
                          handleRowChange(index, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white/70 border border-gray-300/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm text-gray-700 placeholder-gray-400"
                      />
                    </div>
                    {unitRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(index)}
                        className="mt-1.5 p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddRow}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-violet-300 text-violet-600 hover:bg-violet-50 transition-all duration-300 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Another Unit
              </button>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 text-gray-700 font-medium hover:from-gray-500/30 hover:to-gray-600/30 transition-all duration-300 backdrop-blur-md border border-gray-500/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    addingUnits || unitRows.every((r) => !r.name.trim())
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {addingUnits ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Units
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
