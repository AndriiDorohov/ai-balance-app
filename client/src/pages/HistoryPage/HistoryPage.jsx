import { useRef, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEntry, updateEntry } from "../../api/entryService";
import { useAuth } from "../../context/auth/AuthContext";
import { useEntries } from "../../hooks/useEntries";
import EntryItem from "../../components/EntryItem/EntryItem";
import HistoryFilters from "../../components/HistoryFilters/HistoryFilters";
import { toast } from "react-hot-toast";
import { getMoodCategory } from "../../utils/moodUtils";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import styles from "./HistoryPage.module.css";

const MoodChart = lazy(() => import("../../components/MoodChart/MoodChart"));

export default function HistoryPage() {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [justSaved, setJustSaved] = useState(null);
  const [filterValues, setFilterValues] = useState({
    sort: "desc",
    mood: "all",
    start: "",
    end: "",
  });

  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    entries,
    setEntries,
    allEntries,
    loading,
    error,
    fetchMore,
    hasMore,
    isLoadingMore,
    setAllEntries,
  } = useEntries(token, filterValues);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await deleteEntry(id, token);
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setAllEntries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      toast.error("Failed to delete entry");
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry?.id || null);
    setEditedText(entry?.entry_text || "");
  };

  const handleSave = async (id) => {
    try {
      const updated = await updateEntry(id, editedText, token);
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, entry_text: updated.entry_text } : e,
        ),
      );
      setAllEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, entry_text: updated.entry_text } : e,
        ),
      );
      setEditingId(null);
      setEditedText("");
      setJustSaved(id);
      toast.success("Entry updated");
      setTimeout(() => setJustSaved(null), 2000);
    } catch {
      toast.error("Failed to update entry");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <>
      <WavesLottie variant="blue" />
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h1 className={styles.title}>Your Mood History 📘</h1>
          <p className={styles.subheading}>
            Track how your mood changes over time
          </p>
        </div>

        <Suspense
          fallback={<div className={styles.message}>Loading chart...</div>}
        >
          <MoodChart
            entries={allEntries}
            currentMoodFilter={filterValues.mood}
          />
        </Suspense>

        <Button
          className="back"
          onClick={() => navigate("/dashboard", { state: { resetForm: true } })}
        >
          Back to Dashboard
        </Button>

        <HistoryFilters
          initialValues={filterValues}
          onChange={(values) => setFilterValues(values)}
        />

        {entries.length === 0 ? (
          <p className={styles.message}>No entries found.</p>
        ) : (
          <>
            <ul className={styles.list}>
              {entries.map((entry) => (
                <EntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  isEditing={editingId === entry.id}
                  editedText={editedText}
                  setEditedText={setEditedText}
                  justSaved={justSaved === entry.id}
                  textareaRef={textareaRef}
                  moodCategory={getMoodCategory(entry.mood)}
                  onUpdate={(updated) =>
                    setEntries((prev) =>
                      prev.map((e) => (e.id === updated.id ? updated : e)),
                    )
                  }
                />
              ))}
            </ul>

            {hasMore && filterValues.mood === "all" && (
              <div className={styles.loadMoreWrapper}>
                <Button
                  className="loadMore"
                  onClick={fetchMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
