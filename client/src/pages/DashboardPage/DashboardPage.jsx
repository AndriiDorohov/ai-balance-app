import { useState } from "react";
import styles from "./DashboardPage.module.css";
import axios from "axios";

export default function DashboardPage() {
  const [entryText, setEntryText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/gpt/summary",
        {
          entry_text: entryText,
        },
      );

      setResult(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Daily Summary</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="How was your day?"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <div className={styles.result}>
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h3>
            Mood: <span>{result.mood}</span>
          </h3>
          <h3>Recommendation:</h3>
          <p>{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}
