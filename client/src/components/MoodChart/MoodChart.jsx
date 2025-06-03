import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import styles from "./MoodChart.module.css";

const moodToNumber = (category) => {
  if (!category) return 0;
  const lower = category.toLowerCase();
  if (lower === "positive") return 3;
  if (lower === "neutral") return 2;
  if (lower === "negative") return 1;
  return 2;
};

export default function MoodChart({ entries, currentMoodFilter }) {
  if (currentMoodFilter !== "all") return null;

  const chartData = entries.map((entry) => ({
    date: new Date(entry.created_at).toLocaleDateString(),
    mood: moodToNumber(entry.mood_category),
  }));
  console.log("📊 Chart data:", chartData);

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fce4ec" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#fce4ec" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 4]} ticks={[1, 2, 3]} />
          <Tooltip />
          <Area
            type="basis"
            dataKey="mood"
            stroke="#f48fb1"
            strokeWidth={2.5}
            fill="url(#colorMood)"
            dot={{ stroke: "#f48fb1", strokeWidth: 1.5, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
