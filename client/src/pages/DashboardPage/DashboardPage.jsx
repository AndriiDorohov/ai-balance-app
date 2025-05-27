import { useState, useContext } from "react";
import styles from "./DashboardPage.module.css";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";

export default function DashboardPage() {
  const { token, user } = useContext(AuthContext);

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
      const gptResponse = await axios.post(
        "http://localhost:8000/api/gpt/summary",
        { entry_text: entryText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { summary, mood, recommendation } = gptResponse.data;

      await axios.post(
        "http://localhost:8000/api/entries",
        {
          entry_text: entryText,
          summary,
          mood,
          recommendation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResult({ summary, mood, recommendation });
      setEntryText("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome, {user?.email || "User"}!</h1>
      <p>How was your day?</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write about your day..."
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
          <h3>Recommendation</h3>
          <p>{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}
