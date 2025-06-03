import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { loginUser } from "../../api/authService";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { access_token } = await loginUser(email, password);
      login(access_token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <WavesLottie variant="default" />

      <div className={styles.container}>
        <h1 className={styles.title}>Welcome Back!</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        <p className={styles.registerText}>
          Don’t have an account?{" "}
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
