export const getMoodCategory = (mood) => {
  const lower = (mood || "").toLowerCase();
  if (
    lower.includes("positive") ||
    lower.includes("joy") ||
    lower.includes("happy")
  )
    return "positive";
  if (lower.includes("neutral") || lower.includes("ok")) return "neutral";
  if (
    lower.includes("negative") ||
    lower.includes("sad") ||
    lower.includes("depression") ||
    lower.includes("down")
  )
    return "negative";
  return "neutral";
};

export function moodToEmoji(mood) {
  switch (mood?.toLowerCase()) {
    case "happy":
      return "😄";
    case "sad":
      return "😢";
    case "neutral":
      return "😐";
    case "anxious":
      return "😰";
    case "angry":
      return "😡";
    case "excited":
      return "🤩";
    default:
      return "🧠";
  }
}

export function getRecommendationIcon(text) {
  const lower = text.toLowerCase();
  if (lower.includes("meditat")) return "🧘";
  if (lower.includes("walk") || lower.includes("outside")) return "🚶‍♂️";
  if (lower.includes("sleep")) return "🛌";
  if (lower.includes("read")) return "📚";
  if (lower.includes("sun")) return "☀️";
  return "💡";
}
