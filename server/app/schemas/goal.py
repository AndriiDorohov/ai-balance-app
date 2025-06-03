from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class GoalCreate(BaseModel):
    text: str

class GoalResponse(BaseModel):
    id: int
    text: str
    summary: Optional[str]
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True
