import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./VerifyEmailPage.module.css";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("No token provided.");
      setVerifying(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/verify-email`,
          { params: { token } },
        );
        setMessage(response.data.message);
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setMessage(
          error.response?.data?.detail ||
            "Verification failed. Token may be invalid or expired.",
        );
        setSuccess(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleResend = () => {
    navigate("/register");
  };

  return (
    <div className={styles.container}>
      <h1 className={success ? styles.success : styles.error}>{message}</h1>

      {verifying ? null : success ? (
        <p className={styles.redirect}>Redirecting to login...</p>
      ) : (
        <>
          <p className={styles.resendText}>
            Didn’t get the email?{" "}
            <button onClick={handleResend} className={styles.resendLink}>
              Resend
            </button>
          </p>
          <button
            onClick={() => navigate("/login")}
            className={styles.loginButton}
          >
            Go to login
          </button>
        </>
      )}
    </div>
  );
}
