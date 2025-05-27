from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.entry import EntryCreate, EntryResponse
from app.db.session import SessionLocal
from app.models.entry import Entry
from app.services.gpt_service import generate_summary
from datetime import datetime
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/entries", response_model=EntryResponse)
def create_entry(entry_data: EntryCreate, db: Session = Depends(get_db)):
    gpt_data = generate_summary(entry_data.entry_text)

    entry = Entry(
        entry_text=entry_data.entry_text,
        summary=gpt_data["summary"],
        mood=gpt_data["mood"],
        recommendation=gpt_data["recommendation"],
        created_at=datetime.utcnow()
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@router.get("/entries", response_model=List[EntryResponse])
def read_entries(db: Session = Depends(get_db)):
    return db.query(Entry).order_by(Entry.created_at.desc()).all()
