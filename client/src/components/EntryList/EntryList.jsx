import { useRef } from "react";
import { getMoodCategory } from "../../utils/moodUtils";
import EntryItem from "../EntryItem/EntryItem";
import styles from "./EntryList.module.css";

export default function EntryList({
  entries,
  editingId,
  editedText,
  setEditedText,
  justSaved,
  onDelete,
  onEdit,
  onSave,
  onUpdate,
}) {
  const textareaRef = useRef(null);

  return (
    <ul className={styles.list}>
      {entries.map((entry) => (
        <li key={entry.id} className={styles.listItem}>
          <EntryItem
            entry={entry}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSave}
            isEditing={editingId === entry.id}
            editedText={editedText}
            setEditedText={setEditedText}
            justSaved={justSaved === entry.id}
            textareaRef={textareaRef}
            moodCategory={getMoodCategory(entry.mood)}
            onUpdate={(updated) => onUpdate(updated)}
          />
        </li>
      ))}
    </ul>
  );
}
