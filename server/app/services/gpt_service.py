from openai import OpenAI
from app.core.config import OPENAI_API_KEY
import re

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_summary(entry_text: str) -> dict:
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes emotional journal entries and provides insight."
                },
                {
                    "role": "user",
                    "content": (
                        f"Entry: {entry_text}\n\n"
                        "Return in the format:\n"
                        "- Summary: ...\n"
                        "- Detected mood: ...\n"
                        "- Recommendation: ..."
                    )
                }
            ],
            temperature=0.7,
            max_tokens=300,
        )

        content = response.choices[0].message.content.strip()

        summary_match = re.search(r"Summary:\s*(.*?)(?:\n|$)", content)
        mood_match = re.search(r"Detected mood:\s*(.*?)(?:\n|$)", content)
        recommendation_match = re.search(r"Recommendation:\s*(.*)", content)

        return {
            "summary": summary_match.group(1).strip() if summary_match else "Not found",
            "mood": mood_match.group(1).strip() if mood_match else "Not found",
            "recommendation": recommendation_match.group(1).strip() if recommendation_match else "Not found"
        }

    except Exception as e:
        return {
            "summary": "GPT error.",
            "mood": "unknown",
            "recommendation": str(e)
        }
