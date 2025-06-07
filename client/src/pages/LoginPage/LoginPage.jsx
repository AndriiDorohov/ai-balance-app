import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { loginUser } from "../../api/authService";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import PasswordField from "../../components/PasswordField/PasswordField";
import { resendVerification } from "../../api/authService";
import toast from "react-hot-toast";

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

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email above.");
      return;
    }

    try {
      const { message } = await resendVerification(email);
      toast.success(message);
    } catch (err) {
      const detail = err.response?.data?.detail || "Failed to resend email.";
      toast.error(detail);
    }
  };

  return (
    <>
      <WavesLottie variant="default" />

      <div className={styles.container}>
        <div className={styles.headerBox}>
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
              <PasswordField
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
          <p className={styles.resendText}>
            Didn’t get the email?{" "}
            <button
              type="button"
              onClick={handleResend}
              className={styles.resendLink}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
