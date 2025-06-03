import styles from "./DashboardLoader.module.css";

export default function DashboardLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
}
