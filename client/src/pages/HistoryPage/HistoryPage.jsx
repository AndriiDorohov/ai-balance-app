import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./HistoryPage.module.css";

export default function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/entries");
        if (!res.ok) throw new Error("Failed to fetch entries");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>Entry History</h2>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>

      {entries.length === 0 ? (
        <p className={styles.message}>No entries found.</p>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry.id} className={styles.item}>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(entry.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Summary:</strong> {entry.summary}
              </p>
              <p>
                <strong>Mood:</strong> {entry.mood}
              </p>
              <p>
                <strong>Recommendation:</strong> {entry.recommendation}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
