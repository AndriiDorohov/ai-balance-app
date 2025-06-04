import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <>
      <WavesLottie variant="default" />

      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to AI Balance</h1>
        <p className={styles.subheading}>
          Your personal space to reflect, grow, and stay emotionally balanced
        </p>

        <div className={styles.section}>
          <h3>What is AI Balance?</h3>
          <p>
            AI Balance is your intelligent journaling assistant that helps you
            understand your emotions, track your mood over time, and stay
            aligned with your personal goals. Built with modern technology and
            OpenAI’s GPT, it transforms your daily reflections into meaningful
            insights.
          </p>
        </div>

        <div className={styles.section}>
          <h3>How it works</h3>
          <p>
            Every day, you can write a short entry about how you feel or what
            you’ve experienced. Our AI analyzes your text and provides a
            summary, detects your mood, and offers personalized suggestions to
            improve your mental and emotional well-being.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Why use AI Balance?</h3>
          <p>
            Life can get busy and overwhelming. AI Balance offers a calm and
            private space where you can pause, reflect, and reconnect with
            yourself. With helpful visuals and history tracking, you can notice
            trends and understand your emotional journey better.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Meet the Developers</h3>
          <p>
            <strong>Andrii Dorokhov</strong> – Fullstack Developer
            <br />
            <a
              href="https://github.com/AndriiDorohov/ai-balance-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaGithub /> GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://linkedin.com/in/andriidorokhov"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaLinkedin /> LinkedIn
            </a>
          </p>
          <p>
            <strong>Vlad Skvortsov</strong> – DevOps Engineer
            <br />
            <a
              href="https://github.com/vladskvortsov"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaGithub /> GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://www.linkedin.com/in/vlad-skvortsov-354046245/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaLinkedin /> LinkedIn
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
