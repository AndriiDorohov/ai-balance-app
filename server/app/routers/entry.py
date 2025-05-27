from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.entry import EntryCreate, EntryResponse
from app.db.session import SessionLocal
from app.models.entry import Entry
from datetime import datetime
from app.dependencies.auth import get_current_user
from app.models.user import User
from typing import List
from fastapi import Path


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/entries", response_model=EntryResponse)
def create_entry(entry_data: EntryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    entry = Entry(
        user_id=current_user.id,
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

@router.get("/entries", response_model=List[EntryResponse])
def read_entries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Entry)
        .filter(Entry.user_id == current_user.id)
        .order_by(Entry.created_at.desc())
        .all()
    )

@router.put("/entries/{entry_id}", response_model=EntryResponse)
def update_entry(
    entry_id: int = Path(..., gt=0),
    entry_data: EntryCreate = Depends(),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    entry = db.query(Entry).filter(Entry.id == entry_id).first()

    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")

    if entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this entry")

    entry.entry_text = entry_data.entry_text
    db.commit()
    db.refresh(entry)
    return entry
