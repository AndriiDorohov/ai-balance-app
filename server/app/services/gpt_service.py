gpt_service = base / "services" / "gpt_service.py"
gpt_service.write_text('''def generate_summary(entry_text: str) -> dict:
    # TODO: Replace with actual OpenAI call
    return {
        "summary": "You had a productive day.",
        "mood": "neutral",
        "recommendation": "Consider journaling regularly to track your progress."
    }
''')
