from openai import OpenAI
from app.core.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_summary(entry_text: str) -> dict:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes emotional journal entries and provides insight."
                },
                {
                    "role": "user",
                    "content": f"Entry: {entry_text}\n\nReturn:\n- Summary\n- Detected mood\n- 1 useful recommendation"
                }
            ],
            temperature=0.7,
            max_tokens=300,
        )

        gpt_message = response.choices[0].message.content.strip()

        return {
            "summary": gpt_message,
            "mood": "auto",
            "recommendation": "from GPT"
        }

    except Exception as e:
        return {
            "summary": "GPT error.",
            "mood": "unknown",
            "recommendation": str(e)
        }
