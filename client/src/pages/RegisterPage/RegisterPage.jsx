import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, resendVerification } from "../../api/authService";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import PasswordField from "../../components/PasswordField/PasswordField";
import toast from "react-hot-toast";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await registerUser(email, password);
      toast.success(res.message || "Registered successfully");
      setRegistered(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    }
  };

  const handleResend = async () => {
    try {
      const { message } = await resendVerification(email);
      toast.success(message);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to resend email.");
    }
  };

  return (
    <>
      <WavesLottie variant="default" />
      <div className={styles.container}>
        <h1 className={styles.title}>Create Account</h1>

        {!registered ? (
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

            <PasswordField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={styles.input}
              required
            />

            <PasswordField
              label="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              className={styles.input}
              required
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
        ) : (
          <>
            <h2 className={styles.subtitle}>You're almost there</h2>
            <p className={styles.verificationText}>
              We’ve sent a verification email to <br />
              <span className={styles.email}>{email}</span>.
              <br />
              Please check your inbox and spam folder.
            </p>
            <p className={styles.resendWrapper}>
              Didn’t get the email?{" "}
              <button
                type="button"
                onClick={handleResend}
                className={styles.resendButton}
              >
                Resend
              </button>
            </p>
          </>
        )}

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
