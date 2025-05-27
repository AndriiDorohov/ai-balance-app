from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.db.session import Base

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    entry_text = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    mood = Column(String(50), nullable=False)
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False)
