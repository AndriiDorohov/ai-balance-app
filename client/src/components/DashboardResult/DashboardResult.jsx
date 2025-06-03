import { motion } from "framer-motion";
import { moodToEmoji, getRecommendationIcon } from "../../utils/moodUtils";
import styles from "./DashboardResult.module.css";

export default function DashboardResult({ result, resultRef }) {
  if (!result) return null;

  return (
    <motion.div
      className={styles.dashboardResult}
      ref={resultRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.dashboardSectionTitle}>Summary</h2>
      <p>{result.summary}</p>

      <h3 className={styles.dashboardSectionTitle}>
        Mood:{" "}
        <span className={styles.dashboardMood}>
          {moodToEmoji(result.mood)} {result.mood}
        </span>
      </h3>

      <h3 className={styles.dashboardSectionTitle}>
        Recommendation {getRecommendationIcon(result.recommendation)}
      </h3>
      <p>{result.recommendation}</p>
    </motion.div>
  );
}
