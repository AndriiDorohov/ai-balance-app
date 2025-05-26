gpt_schema = base / "schemas" / "gpt.py"
gpt_schema.write_text('''from pydantic import BaseModel

class GPTRequest(BaseModel):
    entry_text: str

class GPTResponse(BaseModel):
    summary: str
    mood: str
    recommendation: str
''')
