import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import {
  createGoal,
  getGoals,
  toggleGoal,
  deleteGoal,
} from "../../api/goalService";
import styles from "./GoalsPage.module.css";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import Button from "../../components/Button/Button";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals(token);
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch goals", error);
      }
    };
    fetchGoals();
  }, [token]);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const newGoal = await createGoal(text, token);
      setGoals([newGoal, ...goals]);
      setText("");
    } catch (error) {
      console.error("Failed to add goal", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updated = await toggleGoal(id, token);
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
    } catch (error) {
      console.error("Failed to toggle goal", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoal(id, token);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Failed to delete goal", error);
    }
  };

  return (
    <>
      <WavesLottie variant="lavanda" />
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2 className={styles.title}>Your Goals 🎯</h2>
          <p className={styles.subheading}>
            Stay focused and achieve your personal goals
          </p>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a goal..."
            disabled={loading}
          />
          <Button className="save" onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add Goal"}
          </Button>
        </div>

        <ul className={styles.list}>
          {goals.map((goal) => (
            <li key={goal.id} className={styles.item}>
              <div className={styles.goalText}>
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => handleToggle(goal.id)}
                />
                <span className={goal.completed ? styles.completed : ""}>
                  {goal.text}
                </span>
              </div>
              <p className={styles.summary}>{goal.summary}</p>
              <div className={styles.buttons}>
                <Button
                  className="delete"
                  onClick={() => handleDelete(goal.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
