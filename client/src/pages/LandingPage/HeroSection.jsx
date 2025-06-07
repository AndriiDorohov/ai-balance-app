import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Welcome to AI Balance</h1>
      <p className={styles.subtitle}>
        Your Mood & Productivity Assistant powered by AI
      </p>
      <div className={styles.buttons}>
        <Button onClick={() => navigate("/login")} className="landingLogin">
          Log In
        </Button>
        <Button
          onClick={() => navigate("/register")}
          className="landingRegister"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
