import { useState } from "react";
import styles from "./ExpandableText.module.css";

export default function ExpandableText({ label, text, limit = 200 }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const isLong = text.length > limit;
  const displayText = expanded || !isLong ? text : text.slice(0, limit) + "...";

  return (
    <p className={styles.text}>
      <strong>{label}:</strong> {displayText}{" "}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={styles.toggleBtn}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </p>
  );
}
