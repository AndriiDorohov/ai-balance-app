from openai import OpenAI
from app.core.config import settings
import re

client = OpenAI(api_key=settings.OPENAI_API_KEY)

print("GPT TOKEN (start):", settings.OPENAI_API_KEY[:10])


def generate_summary(entry_text: str) -> dict:
    try:
        prompt_content = (
            f"Analyze the following journal entry and provide:\n"
            "1. A brief summary of the text.\n"
            "2. The mood, as one of these exact words only: Positive, Neutral, Negative.\n"
            "3. A short recommendation based on the mood.\n\n"
            f"Journal entry:\n\"\"\"{entry_text}\"\"\"\n\n"
            "Return the response exactly in this format:\n"
            "- Summary: ...\n"
            "- Detected mood: ...\n"
            "- Recommendation: ..."
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes emotional journal entries and provides insight."
                },
                {
                    "role": "user",
                    "content": prompt_content,
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



def analyze_goal(goal_text: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a motivational coach who helps people stay focused on their goals."
                },
                {
                    "role": "user",
                    "content": (
                        f"Goal: {goal_text}\n\n"
                        "Write a short motivational message (1-2 sentences) that encourages the person to pursue this goal."
                    )
                }
            ],
            temperature=0.8,
            max_tokens=100,
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating summary: {str(e)}"
