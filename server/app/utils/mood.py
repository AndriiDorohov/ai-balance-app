def extract_category(full_mood: str) -> str:
    mood = full_mood.lower()
    if "positive" in mood or "happy" in mood or "joy" in mood:
        return "positive"
    if "neutral" in mood or "ok" in mood:
        return "neutral"
    if "negative" in mood or "sad" in mood or "depression" in mood or "down" in mood:
        return "negative"
    return "neutral"
