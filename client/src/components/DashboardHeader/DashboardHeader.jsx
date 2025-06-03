import styles from "./DashboardHeader.module.css";

export default function DashboardHeader({ username }) {
  return (
    <div className={styles.headerBox}>
      <h1 className={styles.title}>Hello, {username || "Friend"} 👋</h1>
      <p className={styles.subheading}>How are you feeling today?</p>
    </div>
  );
}
