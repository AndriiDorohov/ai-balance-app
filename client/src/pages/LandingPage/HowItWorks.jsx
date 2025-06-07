import styles from "./LandingPage.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>How It Works</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <h3>1. Write</h3>
          <p>Enter your thoughts or mood in a simple daily entry.</p>
        </div>
        <div className={styles.step}>
          <h3>2. Analyze</h3>
          <p>
            AI analyzes your text and provides insights about your emotional
            state.
          </p>
        </div>
        <div className={styles.step}>
          <h3>3. Reflect</h3>
          <p>See your trends, adjust your goals, and feel more balanced.</p>
        </div>
      </div>
    </section>
  );
}
