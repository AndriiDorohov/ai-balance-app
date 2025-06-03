from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EntryCreate(BaseModel):
    entry_text: str
    summary: Optional[str] = None
    mood: Optional[str] = None
    recommendation: Optional[str] = None

class EntryResponse(BaseModel):
    id: int
    entry_text: str
    summary: str
    mood: str
    recommendation: str
    mood_category: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
