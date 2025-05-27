from pydantic import BaseModel
from datetime import datetime

class EntryCreate(BaseModel):
    entry_text: str

class EntryResponse(BaseModel):
    id: int
    entry_text: str
    summary: str
    mood: str
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True
