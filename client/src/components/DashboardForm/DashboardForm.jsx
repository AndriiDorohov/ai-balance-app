import styles from "./DashboardForm.module.css";

export default function DashboardForm({
  entryText,
  setEntryText,
  handleSubmit,
  loading,
  isSubmitting,
  entryExists,
}) {
  return (
    <div className={styles.dashboardFormWrapper}>
      <form onSubmit={handleSubmit} className={styles.dashboardForm}>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write about your day..."
          required
          disabled={loading || isSubmitting || entryExists}
          className={styles.dashboardTextarea}
        />

        <p className={styles.dashboardHelperText}>
          Example: "Today was a busy day, I got a lot done..."
        </p>

        <button
          type="submit"
          className={styles.dashboardButton}
          disabled={loading || isSubmitting || entryExists}
        >
          {entryExists
            ? "Already submitted"
            : loading
              ? "Analyzing..."
              : "Get AI Summary"}
        </button>
      </form>
    </div>
  );
}
