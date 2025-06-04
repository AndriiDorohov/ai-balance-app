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
  const [entryExists, setEntryExists] = useState(false);
  const hasShownToast = useRef(false);

  const { token, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchTodayEntry = async () => {
      try {
        const today = await getTodayEntry(token);
        if (today) {
          setEntryExists(true);
          setEntryText(today.entry_text || "");
          if (!hasShownToast.current) {
            toast.error(
              "You have already submitted today's entry. Try again tomorrow 🕓",
              {
                position: "top-right",
              },
            );
            hasShownToast.current = true;
          }
        } else {
          setEntryExists(false);
          setEntryText("");
        }
      } catch (err) {
        setEntryExists(false);
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
    if (entryExists) {
      toast.error("Only one entry per day is allowed.");
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchSummary(entryText, token);
      setResult(data);
      setEntryText("");
      setEntryExists(true);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);

      toast.success("Entry saved successfully!", {
        duration: 4000,
        position: "top-right",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <WavesLottie variant="default" />
      {/* <BlurOverlay /> */}
      <div className={styles.dashboardContainer}>
        <DashboardHeader username={user?.username} />

        <DashboardForm
          entryText={entryText}
          setEntryText={setEntryText}
          handleSubmit={handleSubmit}
          loading={loading}
          isSubmitting={isSubmitting}
          entryExists={entryExists}
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
