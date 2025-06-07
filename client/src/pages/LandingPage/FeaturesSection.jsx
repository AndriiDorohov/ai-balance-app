import { BrainCog, LineChart, Target, Rocket } from "lucide-react";
import styles from "./FeaturesSection.module.css";

export default function FeaturesSection() {
  return (
    <section className={styles.features}>
      <h2 className={styles.heading}>Why AI Balance?</h2>
      <ul className={styles.list}>
        <li>
          <BrainCog className={styles.icon} />
          <span>AI-powered mood insights</span>
        </li>
        <li>
          <LineChart className={styles.icon} />
          <span>Track emotional trends visually</span>
        </li>
        <li>
          <Target className={styles.icon} />
          <span>Set and achieve personal goals</span>
        </li>
        <li>
          <Rocket className={styles.icon} />
          <span>Powered by GPT & optional Web3</span>
        </li>
      </ul>
    </section>
  );
}
