import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { registerUser, loginUser } from "../../api/authService";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token, login } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(email, password);
      const { access_token } = await loginUser(email, password);
      login(access_token);
      navigate("/dashboard");
    } catch {
      setError("Registration failed.");
    }
  };

  return (
    <>
      <WavesLottie variant="default" />

      <div className={styles.container}>
        <h1 className={styles.title}>Create Account</h1>
        <form onSubmit={handleRegister} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              className={styles.input}
              value={email}
              required
              placeholder="your.email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              className={styles.input}
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Confirm Password
            <input
              type="password"
              className={styles.input}
              value={confirm}
              required
              placeholder="Repeat your password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
