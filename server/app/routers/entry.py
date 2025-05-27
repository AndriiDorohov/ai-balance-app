from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.entry import EntryCreate, EntryResponse
from app.db.session import SessionLocal
from app.models.entry import Entry
from datetime import datetime

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/entries", response_model=EntryResponse)
def create_entry(entry_data: EntryCreate, db: Session = Depends(get_db)):
    entry = Entry(
        entry_text=entry_data.entry_text,
        summary="(placeholder)",
        mood="(placeholder)",
        recommendation="(placeholder)",
        created_at=datetime.utcnow()
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry
