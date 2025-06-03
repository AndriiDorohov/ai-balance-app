import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../context/auth/AuthContext";

import { fetchSummary } from "../../api/gptService";
import { getTodayEntry } from "../../api/entryService";

import { toast } from "react-hot-toast";

import DashboardHeader from "../../components/DashboardHeader/DashboardHeader.jsx";
import DashboardForm from "../../components/DashboardForm/DashboardForm.jsx";
import DashboardResult from "../../components/DashboardResult/DashboardResult.jsx";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import BlurOverlay from "../../components/BlurOverlay/BlurOverlay";
import Spinner from "../../components/Spinner/Spinner";

import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const [entryText, setEntryText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const { token, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchTodayEntry = async () => {
      try {
        const today = await getTodayEntry(token);
        console.log("✅ Fetched today's entry:", today);

        if (today.summary || today.mood || today.recommendation) {
          setEntryText("");
        } else {
          setEntryText(today.entry_text);
        }
      } catch (err) {
        console.log("ℹ️ No entry for today");
        setEntryText("");
      }
    };

    if (location.state?.resetForm) {
      setEntryText("");
      window.history.replaceState({}, "");
    }

    fetchTodayEntry();
  }, [token, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchSummary(entryText, token);
      setResult(data);
      setEntryText("");

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);

      toast.success("Entry saved successfully!", {
        duration: 4000,
        position: "top-right",
      });
    } catch (err) {
      console.error("❌ Error in handleSubmit:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <WavesLottie variant="default" />
      <BlurOverlay />
      <div className={styles.dashboardContainer}>
        <DashboardHeader username={user?.username} />

        <DashboardForm
          entryText={entryText}
          setEntryText={setEntryText}
          handleSubmit={handleSubmit}
          loading={loading}
          isSubmitting={isSubmitting}
        />

        {loading && <Spinner />}
        {error && <p className={styles.dashboardError}>{error}</p>}
        {!loading && result && (
          <DashboardResult result={result} resultRef={resultRef} />
        )}
      </div>
    </>
  );
}
