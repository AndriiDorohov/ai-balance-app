import React, { memo, useState } from "react";

import styles from "./EntryItem.module.css";
import ExpandableText from "../ExpandableText/ExpandableText";
import Button from "../Button/Button";

import { moodToEmoji, getRecommendationIcon } from "../../utils/moodUtils";
import { regenerateEntry } from "../../api/entryService";
import { useAuth } from "../../context/auth/AuthContext";

export default function EntryItem({
  entry,
  onDelete,
  onEdit,
  onSave,
  isEditing,
  editedText,
  setEditedText,
  justSaved,
  textareaRef,
  onUpdate,
  moodCategory,
}) {
  const { token } = useAuth();
  const [regenerating, setRegenerating] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleRegenerate = async () => {
    if (!window.confirm("Regenerate GPT analysis for this entry?")) return;

    try {
      setRegenerating(true);
      const updatedEntry = await regenerateEntry(entry.id, token);
      onUpdate(updatedEntry);
      setUpdated(true);
      setTimeout(() => setUpdated(false), 2000);
    } catch {
      alert("Failed to regenerate GPT analysis.");
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <li className={`${styles.item} ${styles[moodCategory] || ""}`}>
      {isEditing ? (
        <>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className={styles.buttons}>
            <Button onClick={() => onSave(entry.id)} className="save">
              Save
            </Button>
            <Button onClick={() => onEdit(null)} className="cancel">
              Cancel
            </Button>
          </div>
          {justSaved && <p className={styles.saved}>Saved!</p>}
        </>
      ) : (
        <>
          <div className={styles.buttons}>
            <Button onClick={() => onDelete(entry.id)} className="delete">
              Delete
            </Button>
            <Button onClick={() => onEdit(entry)} className="edit">
              Edit
            </Button>
            <Button
              onClick={handleRegenerate}
              className="regenerate"
              disabled={regenerating}
            >
              {regenerating ? "Regenerating..." : "Regenerate"}
            </Button>
          </div>

          {updated && <p className={styles.saved}>Updated!</p>}

          <p>
            <strong>Date:</strong> {new Date(entry.created_at).toLocaleString()}
          </p>

          <ExpandableText label="Your Entry" text={entry.entry_text} />
          <ExpandableText label="Summary" text={entry.summary} />

          <p>
            <strong>Mood:</strong> {entry.mood} {moodToEmoji(entry.mood)}
          </p>

          <ExpandableText
            label={`Recommendation ${getRecommendationIcon(entry.recommendation)}`}
            text={entry.recommendation}
          />
        </>
      )}
    </li>
  );
}
